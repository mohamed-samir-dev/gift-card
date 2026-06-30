export default function LoadingSkeleton() {
  return (
    <div className="pd-skel-page">
      <div className="pd-skel-inner">
        <div className="pd-skel-back" />
        <div className="pd-skel-grid">
          <div className="pd-skel-box pd-skel-img-box" />
          <div className="pd-skel-box pd-skel-info-box" />
        </div>
      </div>
    </div>
  );
}
