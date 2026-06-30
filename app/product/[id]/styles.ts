export const productStyles = `
  /* ── PAGE ── */
  .pd-page {
    min-height: 100vh;
    background: linear-gradient(160deg, #f5f3ff 0%, #ffffff 45%, #f0f4ff 100%);
    position: relative;
    overflow-x: hidden;
  }

  /* blobs */
  .pd-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .pd-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .pd-blob-1 {
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(108,77,255,0.1) 0%, transparent 70%);
    top: -180px; right: -120px;
  }
  .pd-blob-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(79,123,255,0.09) 0%, transparent 70%);
    bottom: -100px; left: -100px;
  }

  .pd-content {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem);
  }

  /* ── BACK ── */
  .pd-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--primary);
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    margin-bottom: 2rem;
    border: 1.5px solid rgba(108,77,255,0.22);
    background: rgba(108,77,255,0.06);
    font-family: inherit;
    padding: 8px 18px;
    border-radius: 999px;
    transition: all 0.22s;
  }
  .pd-back:hover {
    background: rgba(108,77,255,0.12);
    border-color: rgba(108,77,255,0.4);
    gap: 11px;
  }

  /* ── MAIN GRID ── */
  .pd-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (min-width: 800px) {
    .pd-grid { grid-template-columns: 1.1fr 1fr; }
  }

  /* ── IMAGE SIDE ── */
  .pd-img-col { display: flex; flex-direction: column; gap: 1.1rem; }

  .pd-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 24px 70px rgba(108,77,255,0.18), 0 0 0 1.5px rgba(108,77,255,0.1);
    background: #ede9ff;
  }
  .pd-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(108,77,255,0.08) 100%);
    z-index: 1;
  }
  .pd-img-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.88);
    border: 1px solid rgba(108,77,255,0.2);
    backdrop-filter: blur(10px);
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 0.73rem;
    font-weight: 800;
    color: var(--primary);
    box-shadow: 0 2px 12px rgba(108,77,255,0.12);
  }

  /* ── TRUST BADGES ── */
  .pd-badges {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.65rem;
  }
  .pd-badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 14px 6px;
    transition: all 0.22s;
    box-shadow: 0 2px 10px rgba(108,77,255,0.05);
  }
  .pd-badge-item:hover {
    border-color: rgba(108,77,255,0.3);
    box-shadow: 0 6px 24px rgba(108,77,255,0.1);
    transform: translateY(-2px);
  }
  .pd-badge-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem;
  }
  .pd-badge-icon.purple { background: rgba(108,77,255,0.1); }
  .pd-badge-icon.blue   { background: rgba(79,123,255,0.1); }
  .pd-badge-icon.gold   { background: rgba(245,200,66,0.12); }
  .pd-badge-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--text-para);
    text-align: center;
    line-height: 1.35;
  }

  /* ── INFO CARD ── */
  .pd-info {
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 26px;
    padding: clamp(1.5rem, 4vw, 2.2rem);
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .pd-cat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .pd-cat {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(108,77,255,0.09);
    border: 1px solid rgba(108,77,255,0.2);
    color: var(--primary);
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 999px;
    letter-spacing: 0.03em;
  }
  .pd-new-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(245,200,66,0.12);
    border: 1px solid rgba(245,200,66,0.35);
    color: #b45309;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 999px;
  }

  .pd-title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 900;
    color: var(--text-heading);
    margin: 0 0 0.65rem;
    line-height: 1.25;
  }
  .pd-brief {
    color: var(--text-para);
    font-size: 0.92rem;
    line-height: 1.75;
    margin: 0 0 1rem;
  }

  .pd-rating-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.25rem;
  }
  .pd-stars { display: flex; gap: 2px; }
  .pd-star { color: #f5c842; font-size: 0.88rem; }
  .pd-rating-text { font-size: 0.78rem; font-weight: 700; color: var(--text-light); }

  .pd-divider {
    border: none;
    border-top: 1.5px solid var(--border);
    margin: 1.1rem 0;
  }

  /* ── PRICE + QTY ROW ── */
  .pd-price-qty-row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    background: linear-gradient(135deg, #f8f7ff 0%, #f0f4ff 100%);
    border: 1.5px solid rgba(108,77,255,0.13);
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  /* ── PRICE ── */
  .pd-price-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 20px;
    border-left: 1.5px solid rgba(108,77,255,0.12);
    margin-bottom: 0;
  }
  .pd-price-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--text-light);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .pd-price-row { display: flex; align-items: flex-end; gap: 6px; }
  .pd-price {
    font-size: clamp(1.7rem, 5vw, 2.2rem);
    font-weight: 900;
    line-height: 1;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .pd-currency {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-para);
    margin-bottom: 3px;
  }
  .pd-per-unit {
    font-size: 0.72rem;
    color: var(--text-light);
    margin-bottom: 3px;
  }

  /* ── QTY ── */
  .pd-qty-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 20px;
    gap: 8px;
    margin-bottom: 0;
  }
  .pd-qty-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--text-light);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .pd-qty-ctrl {
    display: inline-flex;
    align-items: center;
    background: #fff;
    border: 1.5px solid rgba(108,77,255,0.18);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(108,77,255,0.07);
  }
  .pd-qty-btn {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--primary);
    transition: background 0.18s;
  }
  .pd-qty-btn:hover:not(:disabled) { background: rgba(108,77,255,0.08); }
  .pd-qty-btn:disabled { opacity: 0.3; cursor: default; }
  .pd-qty-val {
    min-width: 40px;
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: var(--text-heading);
    border-right: 1.5px solid rgba(108,77,255,0.12);
    border-left: 1.5px solid rgba(108,77,255,0.12);
    line-height: 36px;
  }
  .pd-stock {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.78rem;
    font-weight: 800;
    color: #16a34a;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 1.25rem;
    width: fit-content;
  }
  .pd-stock-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #16a34a;
    box-shadow: 0 0 6px #16a34a;
    animation: pulse-dot 1.5s ease-in-out infinite;
  }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.55;transform:scale(1.35)} }
  .pd-stock.empty { color: #dc2626; background: #fee2e2; border-color: #fecaca; }
  .pd-stock.empty .pd-stock-dot { background: #dc2626; box-shadow: 0 0 6px #dc2626; animation: none; }

  /* ── QTY ── */
  .pd-qty-section { margin-bottom: 1.25rem; }
  .pd-qty-label {
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-light);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    margin-bottom: 9px;
  }
  .pd-qty-ctrl {
    display: inline-flex;
    align-items: center;
    border: 1.5px solid var(--border);
    border-radius: 13px;
    overflow: hidden;
    background: #f8f7ff;
  }
  .pd-qty-btn {
    width: 42px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--primary);
    transition: background 0.18s;
  }
  .pd-qty-btn:hover:not(:disabled) { background: rgba(108,77,255,0.1); }
  .pd-qty-btn:disabled { opacity: 0.3; cursor: default; }
  .pd-qty-val {
    min-width: 50px;
    text-align: center;
    font-weight: 900;
    font-size: 1.05rem;
    color: var(--text-heading);
    border-right: 1.5px solid var(--border);
    border-left: 1.5px solid var(--border);
    line-height: 42px;
  }

  /* ── TOTAL ── */
  .pd-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f7ff;
    border: 1.5px solid rgba(108,77,255,0.14);
    border-radius: 14px;
    padding: 13px 18px;
    margin-bottom: 1.1rem;
  }
  .pd-total-left { display: flex; flex-direction: column; gap: 2px; }
  .pd-total-label { font-size: 0.75rem; color: var(--text-para); font-weight: 700; }
  .pd-total-note { font-size: 0.67rem; color: var(--text-light); }
  .pd-total-val {
    font-size: 1.55rem;
    font-weight: 900;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ── BUY BUTTON ── */
  .pd-buy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 15px;
    font-size: 1.05rem;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    background: var(--gradient);
    color: #fff;
    box-shadow: var(--shadow-btn);
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    margin-bottom: 0.75rem;
    position: relative;
    overflow: hidden;
  }
  .pd-buy-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
    pointer-events: none;
  }
  .pd-buy-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 18px 45px rgba(108,77,255,0.38);
  }
  .pd-buy-btn:active:not(:disabled) { transform: translateY(0); }
  .pd-buy-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .pd-wishlist-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    border: 1.5px solid var(--border);
    border-radius: 13px;
    font-size: 0.88rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    background: #fff;
    color: var(--text-para);
    transition: all 0.2s;
  }
  .pd-wishlist-btn:hover {
    border-color: rgba(108,77,255,0.3);
    color: var(--primary);
    background: rgba(108,77,255,0.04);
  }

  /* ── SPINNER ── */
  .pd-spinner {
    width: 20px; height: 20px;
    border: 3px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── BOTTOM SECTIONS ── */
  .pd-bottom {
    margin-top: 1.75rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }
  @media (min-width: 800px) {
    .pd-bottom { grid-template-columns: 2fr 1fr; }
  }

  .pd-desc-card, .pd-how-card {
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 22px;
    padding: clamp(1.25rem, 3.5vw, 1.9rem);
    box-shadow: 0 4px 20px rgba(108,77,255,0.06);
  }
  .pd-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    font-weight: 900;
    color: var(--text-heading);
    margin: 0 0 1rem;
  }
  .pd-section-icon {
    width: 32px; height: 32px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(108,77,255,0.1);
    border: 1px solid rgba(108,77,255,0.18);
    color: var(--primary);
    flex-shrink: 0;
  }
  .pd-desc-wrap { position: relative; }
  .pd-desc-text {
    color: var(--text-para);
    line-height: 1.85;
    font-size: 0.92rem;
    margin: 0 0 0.6rem;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all 0.3s;
  }
  .pd-desc-text.expanded {
    display: block;
    overflow: visible;
  }
  .pd-read-more {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary);
    font-size: 0.8rem;
    font-weight: 800;
    font-family: inherit;
    padding: 0;
    margin-bottom: 1.25rem;
    transition: opacity 0.18s;
  }
  .pd-read-more:hover { opacity: 0.75; }

  .pd-details-table {
    display: flex;
    flex-direction: column;
    border: 1.5px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }
  .pd-detail-row {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    align-items: center;
    padding: 11px 16px;
    gap: 12px;
    transition: background 0.15s;
  }
  .pd-detail-row:not(:last-child) { border-bottom: 1px solid var(--border); }
  .pd-detail-row:nth-child(odd) { background: #f9f8ff; }
  .pd-detail-row:hover { background: rgba(108,77,255,0.04); }
  .pd-detail-key {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-heading);
  }
  .pd-detail-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(108,77,255,0.09);
    border: 1px solid rgba(108,77,255,0.18);
    display: flex; align-items: center; justify-content: center;
    color: var(--primary);
    flex-shrink: 0;
  }
  .pd-detail-val {
    font-size: 0.82rem;
    color: var(--text-para);
    font-weight: 500;
    line-height: 1.5;
  }

  .pd-how-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 0;
  }
  .pd-how-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .pd-how-icon-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }
  .pd-how-icon {
    width: 44px; height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(108,77,255,0.12) 0%, rgba(79,123,255,0.1) 100%);
    border: 1.5px solid rgba(108,77,255,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--primary);
    box-shadow: 0 4px 14px rgba(108,77,255,0.12);
    transition: all 0.22s;
    flex-shrink: 0;
  }
  .pd-how-step:hover .pd-how-icon {
    background: linear-gradient(135deg, rgba(108,77,255,0.2) 0%, rgba(79,123,255,0.15) 100%);
    transform: scale(1.07);
    box-shadow: 0 6px 20px rgba(108,77,255,0.22);
  }
  .pd-how-connector {
    width: 2px;
    flex: 1;
    min-height: 18px;
    background: linear-gradient(180deg, rgba(108,77,255,0.25) 0%, rgba(108,77,255,0.06) 100%);
    margin: 4px 0;
    border-radius: 2px;
  }
  .pd-how-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-top: 10px;
    padding-bottom: 22px;
  }
  .pd-how-step:last-child .pd-how-text { padding-bottom: 0; }
  .pd-how-title {
    font-size: 0.88rem;
    font-weight: 900;
    color: var(--text-heading);
    line-height: 1.3;
  }
  .pd-how-desc {
    font-size: 0.78rem;
    color: var(--text-light);
    font-weight: 500;
    line-height: 1.5;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 799px) {
    .pd-grid {
      grid-template-columns: 1fr;
    }
    .pd-img-col {
      order: -1;
    }
    .pd-img-wrap {
      aspect-ratio: 16/9;
      border-radius: 18px;
    }
    .pd-info {
      border-radius: 18px;
      padding: 1.3rem;
    }
    .pd-title {
      font-size: 1.35rem;
    }
    .pd-price-section {
      padding: 13px 15px;
    }
    .pd-qty-section {
      padding: 13px 15px;
    }
    .pd-price {
      font-size: 1.6rem;
    }
    .pd-buy-btn {
      font-size: 0.97rem;
      padding: 14px;
    }
    .pd-badges {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
    .pd-badge-item {
      padding: 10px 4px;
    }
    .pd-badge-label {
      font-size: 0.62rem;
    }
    .pd-badge-icon {
      width: 32px;
      height: 32px;
      font-size: 1rem;
    }
    .pd-bottom {
      grid-template-columns: 1fr;
    }
    .pd-detail-row {
      grid-template-columns: 1fr 1.2fr;
      padding: 10px 12px;
    }
    .pd-detail-key {
      font-size: 0.75rem;
    }
    .pd-detail-val {
      font-size: 0.77rem;
    }
    .pd-back {
      font-size: 0.82rem;
      padding: 7px 14px;
      margin-bottom: 1.25rem;
    }
    .pd-total {
      padding: 11px 14px;
    }
    .pd-total-val {
      font-size: 1.3rem;
    }
    .pd-qty-btn {
      width: 38px;
      height: 38px;
    }
    .pd-qty-val {
      min-width: 42px;
      line-height: 38px;
      font-size: 0.97rem;
    }
    .pd-desc-card, .pd-how-card {
      border-radius: 16px;
      padding: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .pd-content {
      padding: 1rem 0.75rem;
    }
    .pd-title {
      font-size: 1.2rem;
    }
    .pd-price {
      font-size: 1.4rem;
    }
    .pd-price-section {
      padding: 11px 12px;
    }
    .pd-qty-section {
      padding: 11px 12px;
    }
    .pd-qty-btn {
      width: 32px;
      height: 32px;
    }
    .pd-qty-val {
      min-width: 34px;
      line-height: 32px;
      font-size: 0.9rem;
    }
    .pd-badges {
      gap: 0.4rem;
    }
    .pd-badge-label {
      font-size: 0.58rem;
    }
    .pd-badge-icon {
      width: 28px;
      height: 28px;
      font-size: 0.9rem;
      border-radius: 8px;
    }
    .pd-badge-item {
      padding: 8px 3px;
      border-radius: 12px;
    }
    .pd-detail-row {
      grid-template-columns: 1fr;
      gap: 4px;
      padding: 10px 12px;
    }
    .pd-detail-val {
      padding-right: 36px;
    }
    .pd-total-val {
      font-size: 1.15rem;
    }
    .pd-img-wrap {
      aspect-ratio: 3/2;
      border-radius: 14px;
    }
    .pd-how-icon {
      width: 38px;
      height: 38px;
      border-radius: 11px;
    }
    .pd-section-title {
      font-size: 0.92rem;
    }
    .pd-buy-btn {
      font-size: 0.92rem;
      padding: 13px;
      border-radius: 13px;
    }
    .pd-wishlist-btn {
      font-size: 0.82rem;
      padding: 11px;
    }
    .pd-desc-card, .pd-how-card {
      padding: 1rem;
      border-radius: 14px;
    }
    .pd-back {
      font-size: 0.78rem;
      padding: 6px 12px;
      margin-bottom: 1rem;
    }
  }

  /* ── SKELETON ── */
  .pd-skel-page {
    min-height: 100vh;
    background: linear-gradient(160deg, #f5f3ff 0%, #ffffff 50%, #f0f4ff 100%);
    padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem);
  }
  .pd-skel-inner { max-width: 1100px; margin: 0 auto; }
  .pd-skel-back {
    width: 110px; height: 36px;
    border-radius: 999px;
    background: rgba(108,77,255,0.08);
    margin-bottom: 2rem;
  }
  .pd-skel-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 800px) {
    .pd-skel-grid { grid-template-columns: 1.1fr 1fr; }
  }
  .pd-skel-box {
    border-radius: 24px;
    background: rgba(108,77,255,0.06);
    position: relative;
    overflow: hidden;
  }
  .pd-skel-img-box { aspect-ratio: 4/3; }
  .pd-skel-info-box { height: 420px; }
  .pd-skel-box::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: skel-shim 1.5s infinite;
  }
  @keyframes skel-shim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

  /* ── ERROR ── */
  .pd-error {
    min-height: 100vh;
    background: linear-gradient(160deg, #f5f3ff 0%, #fff 50%, #f0f4ff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--text-para);
    font-size: 1rem;
    font-weight: 700;
  }
  .pd-error button {
    background: var(--gradient);
    border: none;
    color: #fff;
    font-family: inherit;
    font-weight: 800;
    font-size: 0.9rem;
    padding: 11px 26px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: var(--shadow-btn);
    transition: opacity 0.2s, transform 0.2s;
  }
  .pd-error button:hover { opacity: 0.88; transform: translateY(-2px); }
`;
