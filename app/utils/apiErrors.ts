const errorMap: Record<string, string> = {
  // order
  "Insufficient wallet balance": "رصيد المحفظة غير كافٍ لإتمام الطلب",
  "No cards in stock": "المنتج غير متوفر حالياً، يرجى المحاولة لاحقاً",
  "Product not available": "هذا المنتج غير متاح",

  // auth
  "Invalid credentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  "Email already in use": "البريد الإلكتروني مستخدم بالفعل",
  "Account blocked": "هذا الحساب موقوف، تواصل مع الدعم",
  "Missing Google data": "حدث خطأ في تسجيل الدخول بجوجل",

  // coupon
  "Invalid coupon": "كود الخصم غير صحيح",
  "Coupon expired": "انتهت صلاحية كود الخصم",
  "Coupon limit reached": "تم استنفاد الحد الأقصى لاستخدام هذا الكود",

  // wallet
  "Wallet not found": "المحفظة غير موجودة",

  // generic
  "Product not found": "المنتج غير موجود",
  "Order not found": "الطلب غير موجود",
};

export function translateError(msg: string): string {
  return errorMap[msg] ?? msg;
}
