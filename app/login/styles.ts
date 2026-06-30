export const authStyles = `
  .auth-page {
    min-height: calc(100vh - 64px);
    background: linear-gradient(160deg, #f5f3ff 0%, #ffffff 45%, #f0f4ff 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  /* ── BLOBS ── */
  .auth-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .auth-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .auth-blob-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(108,77,255,0.13) 0%, transparent 70%);
    top: -160px; right: -100px;
  }
  .auth-blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(79,123,255,0.1) 0%, transparent 70%);
    bottom: -100px; left: -80px;
  }
  .auth-blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  /* ── CONTAINER ── */
  .auth-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /* ── CARD ── */
  .auth-card {
    background: #fff;
    border: 1.5px solid rgba(108,77,255,0.12);
    border-radius: 28px;
    padding: clamp(1.8rem, 5vw, 2.4rem);
    box-shadow: 0 24px 64px rgba(108,77,255,0.13), 0 4px 16px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }

  /* ── HEADER ── */
  .auth-header {
    text-align: center;
    padding-bottom: 0.3rem;
  }
  .auth-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 0.75rem;
  }
  .auth-logo-icon {
    width: 52px; height: 52px;
    border-radius: 16px;
    background: var(--gradient);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.55rem;
    box-shadow: 0 10px 28px rgba(108,77,255,0.32);
    flex-shrink: 0;
  }
  .auth-logo-name {
    font-size: 1.35rem;
    font-weight: 900;
    color: var(--text-heading);
    line-height: 1.2;
  }
  .auth-logo-sub {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--primary);
    opacity: 0.75;
    margin-top: 2px;
  }
  .auth-headline {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-heading);
    margin: 0 0 4px;
  }
  .auth-subline {
    font-size: 0.8rem;
    color: var(--text-light);
    margin: 0;
  }

  /* ── TABS ── */
  .auth-tabs {
    display: flex;
    background: #f0eeff;
    border-radius: 16px;
    padding: 5px;
    position: relative;
    gap: 0;
  }
  .auth-tab {
    flex: 1;
    position: relative;
    z-index: 1;
    padding: 11px 10px;
    font-size: 0.87rem;
    font-weight: 800;
    font-family: inherit;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 12px;
    color: var(--text-light);
    transition: color 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .auth-tab.active { color: var(--primary); }
  .auth-tab-indicator {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 5px;
    width: calc(50% - 5px);
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(108,77,255,0.15);
    transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
    pointer-events: none;
  }
  .auth-tab-indicator.right {
    transform: translateX(calc(-100% - 0px));
    right: 5px;
  }

  /* ── GOOGLE BTN ── */
  .auth-google-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 13px;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 14px;
    background: #fff;
    font-size: 0.9rem;
    font-weight: 800;
    font-family: inherit;
    color: var(--text-heading);
    cursor: pointer;
    transition: all 0.22s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  .auth-google-btn:hover:not(:disabled) {
    border-color: rgba(108,77,255,0.3);
    box-shadow: 0 6px 20px rgba(108,77,255,0.12);
    transform: translateY(-1px);
  }
  .auth-google-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  /* ── DIVIDER ── */
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .auth-divider-line {
    flex: 1;
    height: 1.5px;
    background: var(--border);
    border-radius: 2px;
  }
  .auth-divider-text {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--text-light);
    white-space: nowrap;
  }

  /* ── FORM ── */
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .auth-label {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-heading);
    padding-right: 2px;
  }
  .auth-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .auth-input-icon {
    position: absolute;
    right: 14px;
    color: #b0a8cc;
    display: flex;
    pointer-events: none;
    transition: color 0.18s;
  }
  .auth-input {
    width: 100%;
    padding: 12px 42px 12px 14px;
    border: 1.5px solid #e8e4f3;
    border-radius: 13px;
    font-size: 0.9rem;
    font-family: inherit;
    background: #faf9ff;
    color: var(--text-heading);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .auth-input:focus {
    border-color: var(--primary);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(108,77,255,0.09);
  }
  .auth-input-wrap:focus-within .auth-input-icon {
    color: var(--primary);
  }
  .auth-input::placeholder { color: #c4bddb; }

  .auth-eye-btn {
    position: absolute;
    left: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #b0a8cc;
    display: flex;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.18s, background 0.18s;
  }
  .auth-eye-btn:hover {
    color: var(--primary);
    background: rgba(108,77,255,0.07);
  }

  /* ── SUBMIT ── */
  .auth-submit-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 14px;
    background: var(--gradient);
    color: #fff;
    font-size: 0.97rem;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 0 8px 28px rgba(108,77,255,0.32);
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 0.3rem;
    letter-spacing: 0.01em;
  }
  .auth-submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
    pointer-events: none;
  }
  .auth-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 18px 44px rgba(108,77,255,0.4);
  }
  .auth-submit-btn:active:not(:disabled) { transform: translateY(0); }
  .auth-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── DIVIDER ── */
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .auth-divider-line {
    flex: 1;
    height: 1.5px;
    background: #ede9f8;
    border-radius: 2px;
  }
  .auth-divider-text {
    font-size: 0.72rem;
    font-weight: 700;
    color: #b0a8cc;
    white-space: nowrap;
  }

  /* ── SWITCH ── */
  .auth-switch {
    text-align: center;
    font-size: 0.83rem;
    color: var(--text-para);
    margin: 0;
    padding: 0.3rem 0 0;
    border-top: 1.5px solid #f0eeff;
  }
  .auth-switch-btn {
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: 800;
    color: var(--primary);
    cursor: pointer;
    padding: 0;
    margin-right: 4px;
    transition: opacity 0.18s;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .auth-switch-btn:hover { opacity: 0.75; }

  /* ── SPINNER ── */
  .auth-spinner {
    display: inline-block;
    width: 18px; height: 18px;
    border: 2.5px solid rgba(108,77,255,0.25);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: auth-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  .auth-spinner.white {
    border-color: rgba(255,255,255,0.3);
    border-top-color: #fff;
  }
  @keyframes auth-spin { to { transform: rotate(360deg); } }

  /* ── RESPONSIVE ── */

  /* tablet: 480px - 768px */
  @media (max-width: 768px) {
    .auth-page {
      min-height: calc(100vh - 56px);
      align-items: flex-start;
      padding: 1.5rem 1rem 2rem;
    }
    .auth-container {
      max-width: 100%;
    }
    .auth-card {
      border-radius: 22px;
      padding: 1.6rem 1.4rem;
      gap: 1.1rem;
    }
    .auth-logo-icon {
      width: 46px;
      height: 46px;
      font-size: 1.35rem;
      border-radius: 13px;
    }
    .auth-logo-name {
      font-size: 1.2rem;
    }
    .auth-headline {
      font-size: 0.97rem;
    }
    .auth-tab {
      font-size: 0.82rem;
      padding: 10px 8px;
      gap: 5px;
    }
    .auth-google-btn {
      font-size: 0.86rem;
      padding: 12px;
    }
    .auth-input {
      font-size: 0.88rem;
      padding: 11px 40px 11px 13px;
    }
    .auth-submit-btn {
      font-size: 0.93rem;
      padding: 13px;
    }
  }

  /* mobile: max 480px */
  @media (max-width: 480px) {
    .auth-page {
      min-height: calc(100vh - 52px);
      padding: 1rem 0.75rem 2rem;
      align-items: flex-start;
    }
    .auth-card {
      border-radius: 18px;
      padding: 1.3rem 1.1rem;
      gap: 1rem;
      box-shadow: 0 12px 40px rgba(108,77,255,0.1);
    }
    .auth-logo {
      gap: 10px;
      margin-bottom: 0.55rem;
    }
    .auth-logo-icon {
      width: 42px;
      height: 42px;
      font-size: 1.2rem;
      border-radius: 12px;
    }
    .auth-logo-name {
      font-size: 1.1rem;
    }
    .auth-logo-sub {
      font-size: 0.66rem;
    }
    .auth-headline {
      font-size: 0.92rem;
    }
    .auth-subline {
      font-size: 0.75rem;
    }
    .auth-tabs {
      border-radius: 13px;
      padding: 4px;
    }
    .auth-tab {
      font-size: 0.78rem;
      padding: 9px 6px;
      gap: 4px;
      border-radius: 10px;
    }
    .auth-tab-indicator {
      border-radius: 10px;
      top: 4px;
      bottom: 4px;
      right: 4px;
      width: calc(50% - 4px);
    }
    .auth-google-btn {
      font-size: 0.83rem;
      padding: 11px 10px;
      border-radius: 12px;
    }
    .auth-divider-text {
      font-size: 0.68rem;
    }
    .auth-label {
      font-size: 0.76rem;
    }
    .auth-input {
      font-size: 0.86rem;
      padding: 11px 38px 11px 12px;
      border-radius: 11px;
    }
    .auth-input-icon {
      right: 12px;
    }
    .auth-eye-btn {
      left: 10px;
    }
    .auth-form {
      gap: 0.9rem;
    }
    .auth-submit-btn {
      font-size: 0.9rem;
      padding: 12px;
      border-radius: 12px;
    }
    .auth-switch {
      font-size: 0.78rem;
    }
    .auth-blob-1 { width: 280px; height: 280px; }
    .auth-blob-2 { width: 240px; height: 240px; }
    .auth-blob-3 { width: 180px; height: 180px; }
  }

  /* very small: max 360px */
  @media (max-width: 360px) {
    .auth-page {
      padding: 0.75rem 0.6rem 1.5rem;
    }
    .auth-card {
      padding: 1.1rem 0.9rem;
      border-radius: 16px;
    }
    .auth-tab {
      font-size: 0.74rem;
      padding: 8px 4px;
    }
    .auth-tab svg { display: none; }
    .auth-input {
      font-size: 0.84rem;
    }
    .auth-submit-btn {
      font-size: 0.87rem;
      padding: 11px;
    }
  }
`;
