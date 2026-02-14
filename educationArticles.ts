// =============================================================================
// EDUCATION ARTICLES - REAL CONTENT (5 Articles)
// =============================================================================
// Status: ✅ KONTEN REAL & LENGKAP
// Update: Februari 2026
// 
// Artikel ini ditulis dengan standar profesional dan dapat digunakan
// untuk edukasi trading yang sebenarnya.
// =============================================================================

import { EducationArticle } from './types';

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: "risk-management-101",
    title: "Manajemen Risiko: Kunci Bertahan di Dunia Trading",
    category: "Risk Management",
    summary: "Pelajari cara melindungi modal dan mengelola risiko dengan benar. 70-80% trader gagal karena mengabaikan manajemen risiko.",
    readTime: "8 menit",
    content: `
# Manajemen Risiko: Kunci Bertahan di Dunia Trading

## Pendahuluan

Trading forex bukan tentang seberapa banyak profit yang bisa Anda dapatkan, melainkan seberapa lama Anda bisa bertahan di pasar. Statistik menyebutkan bahwa 70-80% trader retail kehilangan uang, dan mayoritas dari mereka gagal bukan karena strategi trading, melainkan karena **pengabaian manajemen risiko**.

## 1. The 2% Rule

**Aturan emas**: Jangan pernah risk lebih dari 2% dari total modal Anda per trade.

**Contoh perhitungan**:
- Modal: $1,000
- Risk per trade: 2% = $20
- Jika SL 50 pips, maka position size = $20 ÷ 50 pips = $0.40 per pip
- Lot size: 0.04 lot

**Kenapa 2%?**
- Dengan 10 loss berturut-turut, Anda masih punya 80% modal tersisa
- Memberikan ruang untuk recovery
- Mengurangi tekanan psikologis

## 2. Risk-Reward Ratio (R:R)

**Minimum R:R yang direkomendasikan**: 1:1.5 atau lebih baik 1:2

Artinya jika Anda risk $20, target profit minimal $30 (1:1.5) atau $40 (1:2).

**Mengapa R:R penting?**

Dengan R:R 1:2, Anda bisa profit hanya dengan 40% win rate:
- 6 loss × $20 = -$120
- 4 win × $40 = +$160
- **Net profit: +$40**

## 3. Position Sizing

**Formula Position Sizing**:
\`
Lot Size = (Risk Amount) ÷ (Stop Loss in Pips × Pip Value)
\`

**Contoh EUR/USD**:
- Modal: $5,000
- Risk: 2% = $100
- SL: 30 pips
- Pip value (0.01 lot): $0.10

Perhitungan:
\`
$100 ÷ (30 × $0.10) = $100 ÷ $3 = 33.3 micro lots = 0.33 lot
\`

## 4. Stop Loss: Garis Pertahanan Terakhir

**Jenis Stop Loss**:

1. **Technical SL**: Berdasarkan level support/resistance
2. **Volatility SL**: Berdasarkan ATR (Average True Range)
3. **Fixed SL**: Jumlah pips tetap

**Tips SL**:
- Jangan geser SL lebih jauh untuk "memberi ruang"
- SL adalah proteksi, bukan prediksi
- Jika SL tersentuh, itu berarti analisis salah - terima dan move on

## 5. Diversifikasi & Correlation

**Jangan buka multiple posisi pada pair yang berkorelasi tinggi**:

- **Positive Correlation**: EUR/USD & GBP/USD (bergerak searah)
- **Negative Correlation**: EUR/USD & USD/CHF (bergerak berlawanan)

**Contoh salah**:
- Buy EUR/USD (risk 2%)
- Buy GBP/USD (risk 2%)
- **Total exposure**: Seperti risk 4% pada satu mata uang (USD)

## 6. Drawdown Management

**Maximum Drawdown harian**: 5-6% dari modal

**Jika terjadi**:
1. Stop trading untuk hari itu
2. Review apa yang salah
3. Jangan "revenge trading"
4. Kembali besok dengan mindset fresh

## 7. Money Management Lanjutan

**Fixed Fractional Method**:
- Risk selalu 2% dari modal saat ini
- Jika modal bertambah, risk amount bertambah
- Jika modal berkurang, risk amount berkurang

**Contoh**:
- Modal awal: $1,000 → Risk $20
- Setelah profit menjadi $1,200 → Risk $24
- Setelah loss menjadi $900 → Risk $18

## 8. Psikologi & Disiplin

**Hal-hal yang harus dihindari**:
- ❌ Full margin / All in
- ❌ Revenge trading setelah loss
- ❌ Menggandakan lot setelah loss (Martingale)
- ❌ Trading tanpa SL
- ❌ Risk lebih dari 2% per trade

**Quote dari Paul Tudor Jones**:
> "Selalu saya pikirkan tentang kekalahan. Cara untuk menghasilkan uang adalah dengan melindungi apa yang Anda miliki."

## Kesimpulan

Manajemen risiko bukanlah sesuatu yang "optional" - itu adalah **syarat mutlak** untuk survive di trading. Anda bisa punya strategi terbaik di dunia, tapi tanpa manajemen risiko yang baik, Anda akan kehabisan modal sebelum sempat profit.

**Ingat**: Trading adalah marathon, bukan sprint. Bertahanlah cukup lama di pasar, dan profit akan datang dengan sendirinya.

---

**Penulis**: Pasè FX Trader Hub  
**Disclaimer**: Artikel ini untuk tujuan edukasi. Trading melibatkan risiko tinggi.
`
  },
  {
    id: "support-resistance-guide",
    title: "Support & Resistance: Panduan Lengkap untuk Pemula",
    category: "Technical Analysis",
    summary: "Pahami konsep dasar Support dan Resistance, level kunci yang menjadi fondasi analisis teknikal trading.",
    readTime: "10 menit",
    content: `
# Support & Resistance: Panduan Lengkap untuk Pemula

## Apa Itu Support dan Resistance?

**Support** adalah level harga dimana buying pressure cukup kuat untuk menghentikan penurunan harga. Bayangkan sebagai "lantai" yang menahan harga agar tidak jatuh lebih dalam.

**Resistance** adalah level harga dimana selling pressure cukup kuat untuk menghentikan kenaikan harga. Ini seperti "langit-langit" yang menahan harga agar tidak naik lebih tinggi.

## Kenapa Support & Resistance Berfungsi?

1. **Psikologis**: Trader mengingat level-level penting di masa lalu
2. **Order Cluster**: Banyak order buy/sell terkumpul di level tertentu
3. **Self-Fulfilling Prophecy**: Banyak trader melihat level yang sama, membuatnya menjadi penting

## Jenis-Jenis Support & Resistance

### 1. Horizontal Levels (Paling Umum)

Level yang terbentuk dari titik-titik low/high yang sejajar secara horizontal.

**Cara mengidentifikasi**:
- Minimal 2 touch points
- Semakin banyak touch points, semakin kuat levelnya
- Area sekitar 10-20 pips dari level utama masih dianggap valid

### 2. Trendlines

Garis yang menghubungkan swing lows (uptrend) atau swing highs (downtrend).

**Uptrend Line**:
- Hubungkan minimal 2 swing lows
- Garis naik dari kiri ke kanan
- Berfungsi sebagai support

**Downtrend Line**:
- Hubungkan minimal 2 swing highs
- Garis turun dari kiri ke kanan
- Berfungsi sebagai resistance

### 3. Dynamic Support/Resistance

Bergerak seiring waktu, biasanya menggunakan moving averages.

**Moving Averages yang umum digunakan**:
- 20 EMA (short-term)
- 50 EMA (medium-term)
- 200 EMA (long-term trend)

### 4. Psychological Levels

Level-level bulat yang memiliki makna psikologis:
- 1.0000, 1.1000, 1.2000 (EUR/USD)
- 1500.00, 1600.00 (XAU/USD)
- 100.000, 110.000 (USD/JPY)

## Konsep Penting

### 1. Role Reversal

Ketika support ditembus, ia sering berubah menjadi resistance. Sebaliknya, resistance yang ditembus sering berubah menjadi support.

**Contoh**:
- Harga turun dan menembus support 1.1000
- Kemudian pull-back ke area 1.1000
- 1.1000 sekarang menjadi resistance
- Harga ditolak dan turun lagi

### 2. Strong vs Weak Levels

**Strong Level**:
- Minimal 3-4 touch points
- Level bertahan selama beberapa bulan
- Accompanied oleh volume tinggi
- Round number

**Weak Level**:
- Hanya 1-2 touch points
- Terbentuk dalam timeframe kecil
- Mudah ditembus

### 3. Support/Resistance Zones

Jangan anggap support/resistance sebagai garis tipis. Anggap sebagai ** zona** (area) dengan ketebalan 10-20 pips.

**Kenapa zone lebih baik?**
- Market tidak presisi sampai pip
- Memberikan ruang untuk noise
- Mengurangi false breakout

## Trading dengan Support & Resistance

### Strategi 1: Bounce Trading

**Setup**:
1. Identifikasi strong support/resistance
2. Tunggu harga mendekati level
3. Cari confirmation (price action/pattern)
4. Entry dengan SL di luar level

**Confirmation signals**:
- Pin bar
- Bullish/bearish engulfing
- Morning/evening star
- Rejection wicks

### Strategi 2: Breakout Trading

**Setup**:
1. Identifikasi level yang sudah di-test multiple times
2. Tunggu breakout dengan momentum kuat
3. Entry setelah retest (breakout + retest)
4. Target next support/resistance level

**Valid breakout criteria**:
- Candle close di luar level
- Volume tinggi
- Momentum kuat (candle besar)
- Retest level yang ditembus

## Timeframe dan Signifikansi

| Timeframe | Signifikansi |
|-----------|--------------|
| Monthly | Very Strong - Level tahunan |
| Weekly | Strong - Level bulanan |
| Daily | Medium-Strong - Level mingguan |
| H4 | Medium - Level harian |
| H1 | Weak - Intraday only |
| M15/M5 | Very Weak - Noise |

**Rule of thumb**: Higher timeframe = Stronger level

## Kesalahan Umum

❌ **Menggunakan terlalu banyak level**  
✅ Fokus pada 2-3 strong levels saja

❌ **Tidak menunggu confirmation**  
✅ Tunggu price action di area level

❌ **Mengabaikan trend**  
✅ Trading searah trend lebih berpeluang

❌ **SL terlalu dekat**  
✅ Beri ruang untuk noise

## Studi Kasus: EUR/USD

**Skenario 1**: Support di 1.0850 (3x touch di Daily)
- Harga turun ke 1.0850
- Muncul bullish pin bar
- Entry buy di 1.0860
- SL di 1.0830 (below support)
- TP di 1.0950 (next resistance)
- **R:R = 1:3**

**Skenario 2**: Breakout resistance 1.1000
- Harga sideways di bawah 1.1000 selama 2 minggu
- Breakout kuat dengan candle bullish besar
- Retest ke 1.1000 (yang sekarang menjadi support)
- Entry buy di retest
- SL di 1.0980
- TP di 1.1100
- **R:R = 1:5**

## Kesimpulan

Support dan Resistance adalah fondasi analisis teknikal. Konsep ini simple tapi powerful ketika diterapkan dengan benar.

**Key Takeaways**:
1. Semakin sering level di-test, semakin kuat (tapi juga semakin rapuh)
2. Trading searah trend lebih berpeluang
3. Tunggu confirmation, jangan prediksi
4. Gunakan konsep zone, bukan garis tipis
5. Always gunakan risk management

---

**Penulis**: Pasè FX Trader Hub  
**Level**: Beginner  
**Prerequisite**: Basic candlestick reading
`
  },
  {
    id: "trading-psychology",
    title: "Psikologi Trading: Mengendalikan Emosi di Pasar",
    category: "Psychology",
    summary: "Mengapa psikologi adalah 80% dari kesuksesan trading. Pelajari cara mengatasi FOMO, greed, fear, dan revenge trading.",
    readTime: "12 menit",
    content: `
# Psikologi Trading: Mengendalikan Emosi di Pasar

## 80% Trading Adalah Psikologi

Anda bisa memiliki:
- ✅ Strategi terbaik di dunia
- ✅ Modal besar
- ✅ Knowledge lengkap tentang analisis teknikal

Tapi tanpa kontrol emosi yang baik, Anda akan **gagal**.

Mark Douglas, penulis Trading in the Zone, berkata:
> "The consistency you seek is in your mind, not in the market."

## The 4 Emosi Penghancur Trader

### 1. FOMO (Fear Of Missing Out)

**Definisi**: Takut ketinggalan momentum, memaksa entry tanpa setup yang valid.

**Contoh**:
- EUR/USD naik 50 pips dalam 10 menit
- Anda belum punya posisi
- Takut ketinggalan, langsung buy tanpa analisis
- 5 menit kemudian harga turun 70 pips
- **Loss besar karena FOMO**

**Cara mengatasi**:
- Trading plan harus ketat - NO setup = NO trade
- Ingat: Market akan selalu ada besok
- Lebih baik miss 1 opportunity daripada loss besar
- Setiap hari ada puluhan opportunity, Anda gak mungkin catch semua

### 2. Greed (Keserakahan)

**Definisi**: Ambisi berlebihan untuk profit lebih, mengabaikan trading plan.

**Contoh**:
- Target TP sudah tercapai (sesuai plan)
- Tapi harga masih naik
- "Ah, masih bisa naik lagi, biarin aja"
- Harga tiba-tiba reversal
- Profit berubah jadi loss

**Cara mengatasi**:
- Follow your plan - TP adalah TP
- Partial close: Close 50% di TP1, 50% di TP2
- "Bulls make money, bears make money, pigs get slaughtered"
- Setiap profit adalah good profit

### 3. Fear (Ketakutan)

**Definisi**: Rasa takut yang berlebihan, membuat Anda:
- Exit posisi terlalu cepat
- Miss opportunity karena takut loss
- Tidak bisa follow trading plan

**Fear biasanya muncul karena**:
- Risk terlalu besar (overleverage)
- Trading dengan uang yang tidak mampu hilang
- Belum punya track record/strategi yang tested

**Cara mengatasi**:
- Risk hanya 1-2% per trade
- Trade dengan money yang relatif kecil dulu
- Backtest strategi hingga confident
- Accept bahwa loss adalah bagian dari bisnis

### 4. Revenge Trading

**Definisi**: Trading dengan emosi setelah mengalami loss, dengan tujuan "balas dendam" ke pasar.

**Contoh**:
- Loss $100 di trade pertama
- Kesal dan marah
- Langsung buka posisi baru dengan lot lebih besar
- "Saya harus recovery loss tadi!"
- Loss lagi $150
- Makin marah, lot makin besar
- Akhirnya loss total $500

**Ini adalah jalan menuju margin call**.

**Cara mengatasi**:
- **STOP TRADING** setelah 2-3 loss berturut-turut
- Jarakkan diri dari layar
- Review trading journal
- Kemali besok dengan mindset fresh
- Tidak ada yang namanya "pasar membalas dendam"

## Building Trading Discipline

### 1. Create a Trading Plan

Setiap trade HARUS melalui checklist:

**Pre-Trade Checklist**:
- [ ] Saya mengerti trend saat ini?
- [ ] Ada setup yang valid?
- [ ] Saya tahu exact entry, SL, dan TP?
- [ ] R:R minimal 1:1.5?
- [ ] Risk hanya 2%?
- [ ] Saya dalam kondisi emosi yang baik?

**Jika salah satu tidak ter-check = NO TRADE**

### 2. Keep a Trading Journal

**Catat setiap trade**:
- Pair & timeframe
- Entry, SL, TP
- R:R ratio
- Setup/Pattern apa
- Hasil (win/loss + pips)
- Emosi saat entry
- Lesson learned

**Review weekly**:
- Win rate
- Average R:R
- Kesalahan yang berulang
- Progress dari minggu lalu

### 3. Accept Losses Gracefully

**Mindset shift**:

❌ "Saya kalah, pasar jahat!"  
✅ "Ini loss yang valid sesuai plan, next trade."

❌ "Saya harus balik modal sekarang!"  
✅ "Loss ini business expense, focus on next setup."

❌ "Saya bodoh, kenapa entry di situ!"  
✅ "Saya belajar dari loss ini, next time lebih baik."

### 4. The Process-Oriented Mindset

**Jangan fokus pada hasil (profit/loss)**  
**Fokus pada proses (setup, risk management, discipline)**

**Contoh**:

Trade A: Loss  
- Setup: Valid  
- Risk: 2%  
- R:R: 1:2  
- **GOOD TRADE** (walaupun loss)

Trade B: Win  
- Setup: Tidak valid (FOMO)  
- Risk: 5%  
- R:R: 1:0.5  
- **BAD TRADE** (walaupun win)

**Kenapa?**  
Karena jika Anda consistently take trade seperti Trade A, dalam jangka panjang Anda akan profit.  
Jika Anda take trade seperti Trade B, dalam jangka panjang Anda akan bangkrut.

## Dealing with Drawdowns

**Drawdown normal**: 5-10% dari modal

**Cara menghadapi**:

1. **Stop Trading** - Cut your losses
2. **Review Journal** - Apa yang salah?
3. **Check Market Conditions** - Mungkin sedang ranging/choppy
4. **Reduce Size** - Trade dengan lot lebih kecil
5. **Come Back Fresh** - Besok adalah hari baru

**Jangan**:
- Double lot untuk "recovery"
- Overtrade
- Change strategy hanya karena drawdown

## The Role of Meditation & Mindfulness

Banyak trader profesional menggunakan teknik mindfulness:

**Before Trading**:
- 5 menit deep breathing
- Clear your mind
- Set intention: "I will follow my plan today"

**During Trading**:
- Notice your emotions
- If feeling anxious/greedy → step away
- Return when calm

**After Trading**:
- Review without judgment
- Let go of today's results
- Focus on improvement

## Developing Patience

**Quote dari Jesse Livermore**:
> "It was never my thinking that made the big money for me. It was always my sitting."

**Tips mengembangkan kesabaran**:

1. **Set Daily Limit** - Max 3-5 trades per day
2. **Wait for A+ Setup** - 80% profit datang dari 20% best setup
3. **Walk Away** - Setelah target tercapai, stop trading
4. **No Trade is a Trade** - Sometimes the best trade is no trade

## Building Confidence

**Confidence datang dari**:

1. **Backtesting** - Test strategy 100+ times
2. **Paper Trading** - Practice tanpa risk
3. **Small Wins** - Start dengan lot kecil
4. **Track Record** - Build consistency over time
5. **Continuous Learning** - Always improve

## Kesimpulan

Psikologi trading adalah perjalanan seumur hidup. Bahkan trader profesional masih berjuang dengan emosi mereka.

**Key Takeaways**:
1. Trading plan adalah rules - follow or don't trade
2. Loss adalah business expense, bukan kegagalan pribadi
3. Fokus pada proses, bukan hasil
4. Emosi negatif = Stop trading
5. Discipline > Motivation
6. Konsistensi mengalahkan intensitas

**Final Quote**:
> "The market is a device for transferring money from the impatient to the patient." - Warren Buffett

---

**Penulis**: Pasè FX Trader Hub  
**Recommended Reading**: 
- "Trading in the Zone" - Mark Douglas
- "The Disciplined Trader" - Mark Douglas
- "Market Wizards" - Jack Schwager
`
  },
  {
    id: "candlestick-patterns",
    title: "Candlestick Patterns: Membaca Bahasa Pasar",
    category: "Technical Analysis",
    summary: "Pelajari 10 candlestick pattern penting yang digunakan trader profesional untuk identifikasi reversal dan continuation.",
    readTime: "15 menit",
    content: `
# Candlestick Patterns: Membaca Bahasa Pasar

## Sejarah Candlestick

Candlestick chart pertama kali dikembangkan oleh trader beras Jepang, Munehisa Homma, pada abad ke-18. Beliau menggunakan candlestick untuk menganalisis harga beras di Osaka.

Steve Nison memperkenalkan candlestick ke dunia Barat pada 1991 melalui bukunya "Japanese Candlestick Charting Techniques".

## Anatomy of a Candlestick

Setiap candlestick terdiri dari:

**Body (Real Body)**:
- Area antara open dan close
- Hijau/Bullish: Close > Open
- Merah/Bearish: Close < Open

**Wicks (Shadows)**:
- Upper Wick: Dari body ke high
- Lower Wick: Dari body ke low

**Interpretasi**:
- Body besar = Momentum kuat
- Body kecil = Indecision
- Wick panjang = Rejection

## 10 Candlestick Patterns Penting

### 1. Doji (Indecision)

**Ciri-ciri**:
- Open dan close hampir sama
- Body sangat kecil atau tidak ada
- Wick bisa panjang atau pendek

**Makna**: Ketidakpastian, battle antara buyer dan seller seimbang.

**Trading**:
- Muncul setelah trend kuat = Potensi reversal
- Muncul di ranging market = Continue ranging
- Tunggu confirmation candle berikutnya

**Jenis Doji**:
- **Long-Legged Doji**: Wick panjang atas bawah (strong indecision)
- **Dragonfly Doji**: Wick panjang bawah saja (bullish reversal)
- **Gravestone Doji**: Wick panjang atas saja (bearish reversal)
- **Four Price Doji**: OHLC sama (extreme indecision)

### 2. Hammer (Bullish Reversal)

**Ciri-ciri**:
- Body kecil di bagian atas
- Lower wick panjang (2-3x body)
- Upper wick minimal atau tidak ada
- Bisa bullish atau bearish body

**Makna**: Seller mendorong harga turun, tapi buyer mengambil alih dan push kembali ke dekat open.

**Kondisi**: Muncul di downtrend (support area)

**Entry**: Setelah confirmation candle bullish

### 3. Shooting Star (Bearish Reversal)

**Ciri-ciri**:
- Body kecil di bagian bawah
- Upper wick panjang (2-3x body)
- Lower wick minimal atau tidak ada

**Makna**: Buyer mencoba push harga naik, tapi seller mengambil alih dan push kembali ke dekat open.

**Kondisi**: Muncul di uptrend (resistance area)

**Entry**: Setelah confirmation candle bearish

### 4. Engulfing Pattern

**Bullish Engulfing**:
- Candle 1: Bearish (body kecil)
- Candle 2: Bullish (body besar yang menelan body candle 1)

**Bearish Engulfing**:
- Candle 1: Bullish (body kecil)
- Candle 2: Bearish (body besar yang menelan body candle 1)

**Makna**: Pergantian kekuasaan yang signifikan. Candle kedua sepenuhnya "mengalahkan" candle pertama.

**Kekuatan**: Semakin besar body candle 2, semakin kuat sinyal.

### 5. Morning Star (Bullish Reversal)

**Tiga candle pattern**:
1. Candle bearish besar (continuation downtrend)
2. Candle kecil (doji or small body) - indecision
3. Candle bullish yang close di atas tengah candle 1

**Makna**: Seller kelelahan → Indecision → Buyer mengambil alih

**Reliability**: Sangat tinggi, terutama di support level

### 6. Evening Star (Bearish Reversal)

**Tiga candle pattern**:
1. Candle bullish besar (continuation uptrend)
2. Candle kecil (doji or small body) - indecision
3. Candle bearish yang close di bawah tengah candle 1

**Makna**: Buyer kelelahan → Indecision → Seller mengambil alih

**Reliability**: Sangat tinggi, terutama di resistance level

### 7. Harami (Inside Bar)

**Ciri-ciri**:
- Candle 1: Body besar (mother bar)
- Candle 2: Body kecil yang sepenuhnya di dalam body candle 1 (baby bar)

**Makna**: Consolidation, market sedang "istirahat" sebelum next move.

**Trading**:
- Tunggu breakout dari range mother bar
- Biasanya continuation pattern
- Tapi bisa juga reversal jika di key level

### 8. Piercing Pattern (Bullish)

**Dua candle pattern**:
1. Bearish candle besar
2. Bullish candle yang:
   - Open below low candle 1
   - Close di atas tengah body candle 1

**Makna**: Bullish reversal signal

**Bedanya dengan Engulfing**: Piercing tidak menelan seluruh body, hanya menembus tengah.

### 9. Dark Cloud Cover (Bearish)

**Dua candle pattern**:
1. Bullish candle besar
2. Bearish candle yang:
   - Open above high candle 1
   - Close di bawah tengah body candle 1

**Makna**: Bearish reversal signal

**Counterpart dari Piercing Pattern**

### 10. Three White Soldiers (Bullish)

**Tiga candle bullish berturut-turut**:
- Masing-masing open di dalam body candle sebelumnya
- Masing-masing close di atas high candle sebelumnya
- Body relatif sama besar
- Minimal upper wick

**Makna**: Bullish momentum yang kuat dan sustainable

**Three Black Crows**: Versi bearishnya

## Multi-Timeframe Analysis

**Candlestick lebih reliable ketika**:

1. **Confluence dengan level**:
   - Pin bar di support/resistance
   - Engulfing di trendline
   - Doji di supply/demand zone

2. **Multiple timeframe alignment**:
   - H4: Bullish engulfing
   - H1: Confirms dengan pin bar
   - M15: Entry setup

3. **Volume confirmation**:
   - Pattern dengan volume tinggi = lebih valid
   - Pattern dengan volume rendah = bisa false signal

## False Signals & How to Avoid

**Common False Patterns**:

1. **Pattern di tengah range** → Tidak ada significance
2. **Pattern dengan wick terlalu panjang** → Noise
3. **Pattern di timeframe kecil (M5/M1)** → Kurang reliable
4. **Pattern tanpa konteks** → Must ada trend atau level

**Confirmation needed**:
- Tunggu candle berikutnya close
- Gunakan indikator (RSI, MACD)
- Cek multiple timeframe
- Pastikan ada level key

## Trading Strategy with Candlestick

**Setup A+**:
1. Trend jelas (uptrend/downtrend)
2. Price di key level (support/resistance)
3. Candlestick pattern muncul
4. Volume di atas average
5. Confirmation candle berikutnya

**Entry Rules**:
- **Aggressive**: Entry setelah pattern close
- **Conservative**: Entry setelah retest level
- **Optimal**: Entry setelah breakout dari consolidation

**Risk Management**:
- SL di luar pattern (below low untuk bullish, above high untuk bearish)
- Risk 1-2% per trade
- R:R minimum 1:2

## Studi Kasus Real

**Kasus 1: EUR/USD, Daily**
- Downtrend selama 2 minggu
- Price mencapai support kuat 1.0850
- Muncul Hammer dengan lower wick panjang
- Candle berikutnya bullish engulfing
- Entry: 1.0860
- SL: 1.0830
- TP: 1.0950 (resistance berikutnya)
- **Result: +90 pips**

**Kasus 2: GBP/JPY, H4**
- Uptrend kuat
- Price di resistance 185.00
- Muncul Evening Star (3 candle pattern)
- Volume tinggi pada candle ketiga
- Entry: 184.80
- SL: 185.30
- TP: 183.50
- **Result: +130 pips**

## Kesalahan Umum

❌ **Trading setiap pattern yang muncul**  
✅ Hanya trade pattern di setup A+

❌ **Mengabaikan trend**  
✅ Pattern searah trend lebih reliable

❌ **Entry tanpa confirmation**  
✅ Tunggu candle berikutnya

❌ **SL terlalu dekat**  
✅ Beri ruang untuk noise

❌ **Mengabaikan timeframe**  
✅ Higher timeframe = more reliable

## Kesimpulan

Candlestick pattern adalah bahasa visual pasar. Mereka memberitahu kita:
- Siapa yang sedang menguasai pasar (buyer/seller)
- Di mana terjadi perubahan momentum
- Kapan terjadi indecision

**Key Takeaways**:
1. Candlestick adalah tool, bukan holy grail
2. Selalu gunakan dalam konteks (trend + level)
3. Konfirmasi sangat penting
4. Multiple timeframe meningkatkan akurasi
5. Risk management tetap priority utama

**Practice Makes Perfect**:
- Backtest 100+ setup
- Catat win rate setiap pattern
- Identifikasi kondisi terbaik untuk masing-masing pattern

---

**Penulis**: Pasè FX Trader Hub  
**Level**: Beginner to Intermediate  
**Recommended Practice**: Demo account 3 bulan
`
  },
  {
    id: "smart-money-concepts-intro",
    title: "Smart Money Concepts: Memahami Cara Institusi Trading",
    category: "Advanced",
    summary: "Pengenalan konsep SMC untuk trader intermediate. Pelajari cara 'Smart Money' bergerak dan bagaimana mengikuti jejak mereka.",
    readTime: "20 menit",
    content: `
# Smart Money Concepts: Memahami Cara Institusi Trading

## Apa Itu Smart Money?

**Smart Money** merujuk pada:
- Bank besar (Goldman Sachs, JP Morgan, dll)
- Hedge funds
- Institutional traders
- Central banks

Mereka mengendalikan 80-90% volume trading di pasar forex.

**Retail Traders** (trader kecil seperti kita) hanya 10-20% volume.

## Mengapa Memahami Smart Money Penting?

Jika Anda tidak mengerti bagaimana smart money bergerak, Anda akan:
- Stop loss selalu kena
- Entry di tempat yang salah
- Beli saat mereka jual, jual saat mereka beli
- Selalu "terlambat" satu langkah

**Goal SMC**: Mengikuti jejak smart money, bukan melawan mereka.

## Konsep Dasar SMC

### 1. Order Blocks (OB)

**Definisi**: Area di mana institusi menempatkan order besar mereka, menyebabkan perubahan arah harga yang signifikan.

**Ciri-ciri Order Block**:
- Candle bullish/bearish terakhir SEBELUM impulsive move
- Body candle cukup besar
- Terjadi break of structure
- Sering diikuti oleh Fair Value Gap (FVG)

**Bullish Order Block**: Candle bearish terakhir sebelum bullish impulsive move
**Bearish Order Block**: Candle bullish terakhir sebelum bearish impulsive move

**Cara mengidentifikasi**:
1. Cari strong impulsive move (bukan ranging)
2. Mark candle terakhir sebelum move tersebut
3. Area tersebut adalah Order Block
4. Tunggu retest ke area OB untuk entry

**Contoh**:
- Harga ranging di H1
- Breakout bullish kuat (impulsive move)
- Candle bearish terakhir sebelum breakout = Bullish OB
- Harga pull-back ke area OB
- Entry buy di OB

### 2. Fair Value Gap (FVG)

**Definisi**: Area imbalanced antara buyer dan seller, terjadi ketika ada perbedaan besar antara close candle 1 dan open candle 3 dengan candle 2 sebagai gap.

**Ciri-ciri FVG**:
- 3 candle pattern
- Candle 1 dan 3 tidak overlap
- Candle 2 adalah "gap"
- Menandakan strong momentum

**Bullish FVG**:
- Candle 1: Bearish
- Candle 2: Bullish (body kecil atau doji)
- Candle 3: Bullish (high di atas close candle 1)
- Gap antara high candle 1 dan low candle 3

**Mengapa FVG penting?**
- Smart money sering retest area FVG
- Area liquidity yang belum tersentuh
- Sering menjadi support/resistance dinamis

**Trading dengan FVG**:
1. Identifikasi FVG setelah impulsive move
2. Tunggu harga retest ke area FVG
3. Entry searah trend
4. SL di luar FVG

### 3. Break of Structure (BOS)

**Definisi**: Ketika harga menembus high/low sebelumnya, menandakan perubahan struktur trend.

**Bullish BOS**:
- Higher high (HH) yang menembus high sebelumnya
- Konfirmasi uptrend berlanjut

**Bearish BOS**:
- Lower low (LL) yang menembus low sebelumnya
- Konfirmasi downtrend berlanjut

**Change of Character (ChoCH)**:
- Bullish ChoCH: HH setelah downtrend (reversal ke uptrend)
- Bearish ChoCH: LL setelah uptrend (reversal ke downtrend)

**Mengapa BOS penting?**
- Konfirmasi trend masih valid
- Entry confirmation
- Exit signal

### 4. Liquidity

**Definisi**: Area di mana stop loss retail trader berkumpul. Smart money "mengincar" liquidity ini.

**Jenis Liquidity**:

1. **Buy Side Liquidity (BSL)**:
   - Area di atas swing high
   - Stop loss seller berkumpul
   - Smart money akan sweep (ambil) liquidity ini
   - Kemudian reversal down

2. **Sell Side Liquidity (SSL)**:
   - Area di bawah swing low
   - Stop loss buyer berkumpul
   - Smart money akan sweep liquidity ini
   - Kemudian reversal up

**Equal Highs/Equal Lows**:
- Dua atau lebih swing highs pada level yang sama = BSL
- Dua atau lebih swing lows pada level yang sama = SSL
- Smart money suka "sweep" equal highs/lows

**Inducement**:
- Fake move untuk mengambil liquidity
- Menarik retail trader untuk entry
- Kemudian reversal ke arah sebenarnya

### 5. Market Structure

**3 Phases of Market**:

1. **Accumulation** (Sideways/Basing):
   - Smart money mengakumulasi posisi
   - Volume rendah
   - Ranging market
   - Jangan trade di phase ini

2. **Distribution** (Trending/Impulsive):
   - Smart money mendistribusikan posisi
   - Volume tinggi
   - Strong directional move
   - Best time to trade

3. **Manipulation** (False Breakout/Sweep):
   - Sweep liquidity
   - False breakout
   - Menipu retail trader
   - Menunggu retail salah entry

### 6. Timeframes dalam SMC

**Higher Timeframe (HTF)** - H4/Daily:
- Identifikasi trend utama
- Cari key Order Blocks
- Tentukan arah trading (bias)

**Lower Timeframe (LTF) - H1/M15**:
- Entry execution
- Fine-tune entry point
- Risk management detail

**Rule**: HTF bias + LTF entry

## SMC Trading Strategy

### Setup A+ (High Probability)

**Kriteria**:
1. HTF trend jelas (uptrend/downtrend)
2. HTF Order Block yang valid
3. HTF FVG yang belum tersentuh
4. LTF BOS/ChoCH searah HTF
5. LTF entry di premium/discount zone
6. Liquidity sweep sebagai confirmation

**Long Setup (Buy)**:
1. HTF: Uptrend
2. HTF: Bullish Order Block diidentifikasi
3. HTF: Bullish FVG present
4. LTF: Bullish BOS
5. LTF: Price di discount zone (OB area)
6. LTF: Sweep SSL (sell side liquidity)
7. Entry: Buy limit di OB/FVG area
8. SL: Below OB/FVG
9. TP: Next HTF resistance/BSL

**Short Setup (Sell)**:
1. HTF: Downtrend
2. HTF: Bearish Order Block diidentifikasi
3. HTF: Bearish FVG present
4. LTF: Bearish BOS
5. LTF: Price di premium zone (OB area)
6. LTF: Sweep BSL (buy side liquidity)
7. Entry: Sell limit di OB/FVG area
8. SL: Above OB/FVG
9. TP: Next HTF support/SSL

## Risk Management dalam SMC

**Position Sizing**:
- Risk 1-2% per trade
- SMC trades bisa tight SL, jadi bisa gunakan lot lebih besar dengan risk yang sama

**Multiple Entry Points**:
- Entry pertama di OB
- Entry kedua di FVG (jika tersentuh)
- Scale in untuk average better price

**Partial Close**:
- Close 50% di TP1 (next internal structure)
- Close 50% di TP2 (HTF target)
- Trail stop untuk sisa posisi

## Kesalahan Umum dalam SMC

❌ **Trading OB tanpa konteks HTF**  
✅ Always align dengan HTF trend

❌ **Entry tanpa menunggu sweep liquidity**  
✅ Tunggu inducement/sweep

❌ **Mengabaikan news/fundamental**  
✅ SMC + fundamental = best result

❌ **Overtrading di ranging market**  
✅ Wait for distribution phase

❌ **Terlalu banyak analysis**  
✅ Keep it simple, focus on key levels

## Studi Kasus: EUR/USD

**Setup**: Bullish continuation

**HTF Analysis (H4)**:
- Trend: Uptrend
- Key Bullish OB di 1.0850
- FVG di 1.0850-1.0860
- BSL di 1.0950 (target)

**LTF Analysis (M15)**:
- Price turun ke 1.0850 (OB area)
- Sweep SSL di 1.0845 (inducement)
- Bullish pin bar di area OB
- Entry: Buy 1.0855
- SL: 1.0835 (below OB)
- TP: 1.0950 (BSL)

**Result**: +95 pips dengan risk 20 pips (R:R 1:4.75)

## Resources untuk Belajar SMC

**YouTube Channels**:
- ICT (Inner Circle Trader) - Original creator
- TraderTom - SMC simplified
- The Trading Channel - SMC basics

**Buku**:
- "Technical Analysis of the Financial Markets" - John Murphy
- "Trading in the Zone" - Mark Douglas (psychology)

**Practice**:
- Backtest 100+ setups
- Demo trading 3 bulan
- Track win rate setiap konsep

## Kesimpulan

SMC bukanlah strategi trading, melainkan **cara pandang** terhadap pasar. Ini mengajarkan kita untuk:
1. Memahami apa yang dilakukan smart money
2. Berpikir seperti institusi, bukan retail
3. Mengikuti aliran uang besar
4. Hindari area-area di mana retail trader biasanya loss

**Key Takeaways**:
- SMC adalah advanced concept, butuh waktu belajar
- Selalu mulai dari HTF untuk arah (bias)
- Gunakan LTF untuk entry execution
- Konsep liquidity adalah kunci
- Risk management tetap nomor satu

**Final Note**:  
SMC bukan holy grail. Tetap ada loss, tapi dengan pemahaman yang benar, probabilitas menang akan meningkat signifikan.

---

**Penulis**: Pasè FX Trader Hub  
**Level**: Intermediate to Advanced  
**Prerequisite**: Support/Resistance, Trend Analysis  
**Recommended Study Time**: 3-6 bulan
`
  }
];

export default EDUCATION_ARTICLES;
