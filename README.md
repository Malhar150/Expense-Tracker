

# 💸 spendly

**A expense tracker for people who say *"I'll track my expenses this month"* every month.**

Built after one too many *"wait, where did ₹3000 go"* moments. Turns out it was Zomato. It's always Zomato.



[**🌐 Live Demo**](https://expense-tracker-gamma-gray-61.vercel.app/) 

</div>

---

## 🤔 what even is this

Spendly is a no-nonsense expense tracker that runs **entirely in your browser**. No backend. No database. No account. No VC-funded "freemium" tier that locks the CSV export behind a $12/month plan.

Just a file you open and a chart that judges you silently.

---

## ⚡ zero setup

Download the zip, open the folder, double-click `index.html`. That's it. No installs, no terminal, no commands to copy-paste from Stack Overflow.


---

## ✦ features

<table>
<tr>
<td width="50%">

**💰 Log Expenses**
Description, amount, date, and one of 6 color-coded categories. Fills in today's date automatically because we both know you're going to forget.

</td>
<td width="50%">

**📊 Live Stats**
Total spent, transaction count, and your single most expensive mistake — always visible at the top.

</td>
</tr>
<tr>
<td width="50%">

**🔍 Filter by Category**
For when you specifically want to confirm how bad the food spending is.

</td>
<td width="50%">

**📉 Spending Chart**
Animated bars that update in real time. Weirdly satisfying. Deeply depressing.

</td>
</tr>
<tr>
<td width="50%">

**💾 Stays Saved**
Uses `localStorage` — survives tab closes, refreshes, and 3am panic sessions.

</td>
<td width="50%">

**📱 Works on Mobile**
Because most bad spending decisions happen on the go.

</td>
</tr>
</table>

---

## 🗂️ the files

Just three of them —

- **`index.html`** — the skeleton, all the markup
- **`styles.css`** — dark theme, acid-green accents, the good stuff
- **`script.js`** — all the logic; readable, no magic

No `node_modules`. No `package.json`. No config files. Open in browser. Works.

---

## 🚀 live & deployed

Already live on Vercel → **[expense-tracker-gamma-gray-61.vercel.app](https://expense-tracker-gamma-gray-61.vercel.app/)**

Want to run your own copy?

**Locally** — just open `index.html`. Still counts.

**Netlify Drop** — drag the folder to [netlify.com/drop](https://app.netlify.com/drop). Instant live URL, free forever.

**GitHub Pages** — push to GitHub → Settings → Pages → Branch: main → Save. Goes live at `yourusername.github.io/spendly`.

---

## 🤷 why no backend?

Because it didn't need one.

Your expenses are yours. They don't need to live on a server in some data centre, get backed up to three clouds, and end up in a breach notification email two years from now. `localStorage` is fast, private, and works offline. For a personal finance tool, that's not a limitation — it's the right call.

---

## 🗺️ roadmap

- [ ] Monthly budget limits — warn you *before* you hit zero, not after
- [ ] Export to CSV — for the spreadsheet crowd (valid lifestyle)
- [ ] Date range filtering — *"show me only this week's damage"*
- [ ] PWA support — install it on your phone like a real app

---

## 🤝 contributing

Codebase is tiny. You can read all of `script.js` in one sitting. If you want to fix something or add a feature, PRs are open — just keep it simple. This isn't the place for a state management library.

---

<div align="center">

*Built by [Malhar](https://github.com/yourusername) · Free to use · ⭐ if it helped*

</div>

