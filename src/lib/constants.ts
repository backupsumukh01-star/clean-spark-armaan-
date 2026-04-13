/** Verified BEP-20 on BNB Smart Chain — see https://bscscan.com/token/ */
export const CONTRACT_ADDRESS =
  "0x5056fFcEE2D83C887945AEfDBaCe182b68689655";

/** Must match token contract metadata (BscScan: cleanspark ltd, CLSK) */
export const TOKEN_SYMBOL = "CLSK";
export const TOKEN_NAME = "CleanSpark Ltd";

/**
 * Liquidity lock contract (PinkLock, Team Finance, Unicrypt, etc.).
 * Replace when you have the lock tx — should not stay equal to the token unless you lock that way.
 */
export const LP_LOCK_ADDRESS =
  "0x5056fFcEE2D83C887945AEfDBaCe182b68689655";

/** Public paths — run `npm run build:pdfs` to generate files under `public/` */
export const AUDIT_PDF_PATH =
  "/audit/Clan_Spark_Security_Audit_Summary.pdf";
export const WHITEPAPER_PDF_PATH =
  "/whitepaper/Clan_Spark_Whitepaper.pdf";
