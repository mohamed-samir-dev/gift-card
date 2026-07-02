import Image from "next/image";

export default function RechargeHeader() {
  return (
    <div className="rc-header">
      <Image
        src="/recharge-icon.webp"
        alt="شحن رصيد"
        width={56}
        height={56}
        className="rc-header-img"
        priority
      />
      <div className="rc-header-text">
        <h1 className="rc-header-title">اشحن رصيد حسابك</h1>
        <p className="rc-header-desc">
          اختر المبلغ وطريقة الدفع المناسبة لك لشحن رصيد حسابك بسرعة وأمان
        </p>
      </div>
    </div>
  );
}
