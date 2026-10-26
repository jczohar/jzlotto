# לוטו ישראל — PWA על GitHub Pages

אפליקציית ניתוח והרכבת לוטו (יעקב זוהר) מוכנה להתקנה כ־Progressive Web App.

## קבצים בתיקייה

| קובץ | תפקיד |
|------|--------|
| `index.html` | האפליקציה המלאה |
| `manifest.webmanifest` | הגדרות PWA (שם, אייקונים, מסך מלא) |
| `sw.js` | Service Worker — עבודה חלקית גם בלי רשת |
| `icon-*.png` / `apple-touch-icon.png` | אייקונים להתקנה |

---

## מה לעשות ב־GitHub (שלב־אחר־שלב)

### 1. יצירת repository

1. היכנס ל־[github.com](https://github.com) והתחבר.
2. לחץ **New repository**.
3. שם מומלץ: `lotto-pwa` (או כל שם באנגלית בלי רווחים).
4. סמן **Public**.
5. **אל** תסמן "Add a README" (יש לנו כבר קבצים).
6. לחץ **Create repository**.

### 2. העלאת הקבצים

**דרך א׳ — ממשק GitHub (הכי פשוט):**

1. ב־repo החדש לחץ **uploading an existing file**.
2. גרור **את כל הקבצים** מתיקיית `pwa` (לא את התיקייה עצמה — את הקבצים שבתוכה):
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - כל קבצי ה־`icon-*.png` ו־`apple-touch-icon.png`
   - (אופציונלי) `README.md`
3. לחץ **Commit changes**.

**דרך ב׳ — Git מהמחשב:**

```bash
cd pwa
git init
git add .
git commit -m "Initial PWA: לוטו ישראל"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lotto-pwa.git
git push -u origin main
```

החלף `YOUR_USERNAME` ו־`lotto-pwa` בשם שלך.

### 3. הפעלת GitHub Pages

1. ב־repo: **Settings** → בתפריט השמאלי **Pages**.
2. תחת **Build and deployment** → **Source**: בחר **Deploy from a branch**.
3. Branch: **main** , תיקייה: **/ (root)**.
4. לחץ **Save**.
5. סמן **Enforce HTTPS** אם מופיע.

אחרי דקה־שתיים האתר יהיה בכתובת:

```
https://YOUR_USERNAME.github.io/lotto-pwa/
```

### 4. בדיקה שה־PWA עובד

1. פתח את הכתובת ב־Chrome / Edge (במובייל או במחשב).
2. **F12** → לשונית **Application** (או Application → Manifest).
3. ודא ש־Manifest נטען וש־Service Worker בסטטוס **activated**.
4. במובייל: בתפריט הדפדפן → **הוסף למסך הבית** / Install app.

### 5. עדכונים בעתיד

1. שנה את `index.html` (או קבצים אחרים) מקומית.
2. **חשוב:** בכל שינוי משמעותי עדכן ב־`sw.js` את השורה:

   ```js
   const CACHE_VERSION = "lotto-v20261026-02";  // הגדל מספר
   ```

3. העלה שוב ל־GitHub (Commit + Push).
4. רענן את האתר (לפעמים צריך Hard Refresh: Ctrl+Shift+R).

---

## הערות חשובות

- **נתיבים יחסיים** (`./`) — עובדים גם ב־Project Pages (`/repo-name/`) וגם ב־User Site.
- האפליקציה טוענת React / Tailwind מ־CDN. בפעם הראשונה עם אינטרנט ה־SW שומר אותם ב־cache; אחר כך יש תמיכה חלקית באופליין.
- נתוני הלוטו נשמרים מקומית בדפדפן (IndexedDB) — לא בשרת GitHub.
- Repository **חייב להיות Public** בתוכנית החינמית של GitHub כדי ש־Pages יעבוד.

## שם משתמש ושם repo

אחרי שתפתח את ה־repo, הכתובת תהיה:

`https://<שם-המשתמש>.github.io/<שם-ה-repo>/`

אם תרצה דומיין מותאם אישית — אפשר בהגדרות Pages תחת Custom domain.
