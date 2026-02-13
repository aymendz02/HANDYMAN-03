
import { GoogleGenAI, Type } from "@google/genai";

// getHandymanAdvice handles AI interaction for the handyman assistant.
export const getHandymanAdvice = async (userPrompt: string, chatHistory: any[]): Promise<any> => {
  // Always create a new GoogleGenAI instance right before making an API call 
  // to ensure it uses the most up-to-date API key from the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Format the history and current prompt into a structured context to avoid turn violations 
  // (consecutive user roles) when sending to generateContent.
  const historyContext = chatHistory.map(m => `${m.role === 'user' ? 'الزبون' : 'المساعد'}: ${m.content}`).join('\n');
  const fullPrompt = `سجل المحادثة السابق:\n${historyContext}\n\nسؤال الزبون الجديد: ${userPrompt}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING, description: "الرد النصي للمستخدم" },
          intent: { type: Type.STRING, enum: ["advice", "booking_init", "info_request"], description: "نية المستخدم: نصيحة، بدء حجز، أو طلب معلومة" },
          suggestedServiceId: { type: Type.STRING, description: "معرف الخدمة المقترحة (مثال: plumbing, electrical)" }
        },
        required: ["reply", "intent"]
      },
      systemInstruction: `
        أنت مساعد ذكي لمنصة "Handyman الجزائر". 
        قواعد العمل:
        - نحن نوفر عمالة فقط (1 زيارة = 1 عامل لـ 6 ساعات). الزبون يوفر السلع.
        - الخدمات المتاحة: plumbing (سباكة), electrical (كهرباء), pvc (نوافذ), locks (أقفال), painting (دهان), construction (بناء), tiles (سيراميك), welding (حدادة), cleaning (تنظيف), transport (نقل).
        - إذا وصف المستخدم مشكلة (مثلاً: تسرب مياه)، أخبره بنوع الحرفي المطلوب واعرض عليه الحجز.
        - إذا وافق المستخدم على الحجز، انتقل لنية 'booking_init'.
        - كن ودوداً وباللهجة الجزائرية البيضاء المفهومة.
      `
    }
  });

  try {
    // Access the text property directly (not a method).
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    // Graceful fallback for unexpected response formats.
    return { 
      reply: response.text || "عذراً، لم أستطع فهم طلبك بشكل كامل. هل يمكنك المحاولة مرة أخرى؟", 
      intent: "advice" 
    };
  }
};
