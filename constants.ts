
import { Service, SubscriptionPlan, PlanDetails } from './types';

export const SERVICES: Service[] = [
  {
    id: 'plumbing',
    title: 'السباكة والتكييف',
    description: 'تركيب وصيانة السباكة، المكيفات، وسخانات المياه.',
    icon: '🔧'
  },
  {
    id: 'electrical',
    title: 'خدمات الكهرباء',
    description: 'تأسيس الكهرباء، إصلاح الأعطال وتركيب الأجهزة.',
    icon: '⚡'
  },
  {
    id: 'pvc',
    title: 'تركيب PVC وألمنيوم',
    description: 'تركيب الأبواب والنوافذ بجودة عالية وإتقان.',
    icon: '🪟'
  },
  {
    id: 'locks',
    title: 'الأقفال والتركيبات',
    description: 'تغيير الأقفال وتركيب مستلزمات المنزل الصغيرة.',
    icon: '🔐'
  },
  {
    id: 'painting',
    title: 'الدهان والصباغة',
    description: 'صباغة داخلية وخارجية بأحدث الألوان والتقنيات.',
    icon: '🎨'
  },
  {
    id: 'construction',
    title: 'بناء وترميمات',
    description: 'أعمال البناء الصغيرة والترميمات المنزلية.',
    icon: '🏗️'
  },
  {
    id: 'tiles',
    title: 'تركيب السيراميك',
    description: 'تركيب بلاط الأرضيات والجدران باحترافية.',
    icon: '🧱'
  },
  {
    id: 'welding',
    title: 'الحدادة واللحام',
    description: 'إصلاح الأبواب الحديدية، الحواجز والأثاث المعدني.',
    icon: '⚙️'
  },
  {
    id: 'cleaning',
    title: 'تنظيف احترافي',
    description: 'تنظيف عميق للمنازل وما بعد أعمال البناء.',
    icon: '🧹'
  },
  {
    id: 'transport',
    title: 'نقل الأثاث',
    description: 'نقل وتغليف الأثاث بكل أمان وموثوقية.',
    icon: '🚚'
  }
];

export const PLANS: Record<SubscriptionPlan, PlanDetails> = {
  [SubscriptionPlan.BASIC]: {
    type: SubscriptionPlan.BASIC,
    price: 20000,
    freeVisits: 20,
    extraVisitPrice: 1500,
    description: 'مثالي للصيانة المنزلية الخفيفة طوال العام.'
  },
  [SubscriptionPlan.STANDARD]: {
    type: SubscriptionPlan.STANDARD,
    price: 40000,
    freeVisits: 80,
    extraVisitPrice: 1500,
    description: 'الخيار الأفضل لأصحاب المنازل ذوي المشاريع المتكررة.'
  },
  [SubscriptionPlan.PREMIUM]: {
    type: SubscriptionPlan.PREMIUM,
    price: 60000,
    freeVisits: 150,
    extraVisitPrice: 1500,
    description: 'للإقامات الكبيرة والمؤسسات التي تحتاج صيانة مستمرة.'
  }
};
