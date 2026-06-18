/**
 * The Remote Admin — contact form → Google Sheet backup
 * ------------------------------------------------------
 * Every website contact-form submission gets emailed to Karen already; this
 * Apps Script also saves a copy as a row in a Google Sheet, so nothing is lost.
 *
 * SETUP (do this signed in as Karen's Google account):
 *  1. Create a new Google Sheet (e.g. "Remote Admin — Website Leads").
 *  2. In the Sheet: Extensions → Apps Script.
 *  3. Delete any starter code, paste THIS whole file, and click Save.
 *  4. Deploy → New deployment → gear icon → "Web app".
 *       - Description:        Contact form backup
 *       - Execute as:         Me
 *       - Who has access:     Anyone
 *     Click Deploy, then Authorize access and allow the permissions.
 *  5. Copy the "Web app" URL (it ends in /exec).
 *  6. In Vercel → remote-admin → Settings → Environment Variables, add:
 *       SHEETS_WEBHOOK_URL = <that /exec URL>
 *     Then redeploy the site.
 *
 * The site posts JSON: { name, contact, help, message }. Emails still send even
 * if this ever fails, and Karen gets an alert email if a row didn't save.
 */

const SHEET_NAME = "Submissions";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email or phone",
        "Needs",
        "Message",
      ]);
      sheet.getRange("A1:E1").setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.contact || "",
      data.help || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you confirm the deployment is live by visiting the /exec URL in a browser.
function doGet() {
  return ContentService.createTextOutput(
    "The Remote Admin contact-form backup is running.",
  );
}
