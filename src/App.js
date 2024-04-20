import React, { useMemo, useState } from "react"; // React ve state kullanabilmek için gerekli kütüphaneleri import ediyoruz.
import axios from "axios"; // API istekleri için axios kütüphanesini import ediyoruz.

// Döviz birimlerini isimlerine göre kısaltmalarıyla eşleştiren bir obje.

const CURRENCY_NAME_TO_CODE = {
  "United Arab Emirates Dirham": "AED",
  "Afghan Afghani": "AFN",
  "Albanian Lek": "ALL",
  "Armenian Dram": "AMD",
  "Netherlands Antillean Guilder": "ANG",
  "Angolan Kwanza": "AOA",
  "Argentine Peso": "ARS",
  "Australian Dollar": "AUD",
  "Aruban Florin": "AWG",
  "Azerbaijani Manat": "AZN",
  "Bosnia-Herzegovina Convertible Mark": "BAM",
  "Barbadian Dollar": "BBD",
  "Bangladeshi Taka": "BDT",
  "Bulgarian Lev": "BGN",
  "Bahraini Dinar": "BHD",
  "Burundian Franc": "BIF",
  "Bermudan Dollar": "BMD",
  "Brunei Dollar": "BND",
  "Bolivian Boliviano": "BOB",
  "Brazilian Real": "BRL",
  "Bahamian Dollar": "BSD",
  Bitcoin: "BTC",
  "Bhutanese Ngultrum": "BTN",
  "Botswanan Pula": "BWP",
  "Belarusian Ruble": "BYN",
  "Belize Dollar": "BZD",
  "Canadian Dollar": "CAD",
  "Congolese Franc": "CDF",
  "Swiss Franc": "CHF",
  "Chilean Unit of Account (UF)": "CLF",
  "Chilean Peso": "CLP",
  "Chinese Yuan (Offshore)": "CNH",
  "Chinese Yuan": "CNY",
  "Colombian Peso": "COP",
  "Costa Rican Colón": "CRC",
  "Cuban Convertible Peso": "CUC",
  "Cuban Peso": "CUP",
  "Cape Verdean Escudo": "CVE",
  "Czech Republic Koruna": "CZK",
  "Djiboutian Franc": "DJF",
  "Danish Krone": "DKK",
  "Dominican Peso": "DOP",
  "Algerian Dinar": "DZD",
  "Egyptian Pound": "EGP",
  "Eritrean Nakfa": "ERN",
  "Ethiopian Birr": "ETB",
  Euro: "EUR",
  "Fijian Dollar": "FJD",
  "Falkland Islands Pound": "FKP",
  "British Pound Sterling": "GBP",
  "Georgian Lari": "GEL",
  "Guernsey Pound": "GGP",
  "Ghanaian Cedi": "GHS",
  "Gibraltar Pound": "GIP",
  "Gambian Dalasi": "GMD",
  "Guinean Franc": "GNF",
  "Guatemalan Quetzal": "GTQ",
  "Guyanaese Dollar": "GYD",
  "Hong Kong Dollar": "HKD",
  "Honduran Lempira": "HNL",
  "Croatian Kuna": "HRK",
  "Haitian Gourde": "HTG",
  "Hungarian Forint": "HUF",
  "Indonesian Rupiah": "IDR",
  "Israeli New Sheqel": "ILS",
  "Manx pound": "IMP",
  "Indian Rupee": "INR",
  "Iraqi Dinar": "IQD",
  "Iranian Rial": "IRR",
  "Icelandic Króna": "ISK",
  "Jersey Pound": "JEP",
  "Jamaican Dollar": "JMD",
  "Jordanian Dinar": "JOD",
  "Japanese Yen": "JPY",
  "Kenyan Shilling": "KES",
  "Kyrgystani Som": "KGS",
  "Cambodian Riel": "KHR",
  "Comorian Franc": "KMF",
  "North Korean Won": "KPW",
  "South Korean Won": "KRW",
  "Kuwaiti Dinar": "KWD",
  "Cayman Islands Dollar": "KYD",
  "Kazakhstani Tenge": "KZT",
  "Laotian Kip": "LAK",
  "Lebanese Pound": "LBP",
  "Sri Lankan Rupee": "LKR",
  "Liberian Dollar": "LRD",
  "Lesotho Loti": "LSL",
  "Libyan Dinar": "LYD",
  "Moroccan Dirham": "MAD",
  "Moldovan Leu": "MDL",
  "Malagasy Ariary": "MGA",
  "Macedonian Denar": "MKD",
  "Myanma Kyat": "MMK",
  "Mongolian Tugrik": "MNT",
  "Macanese Pataca": "MOP",
  "Mauritanian Ouguiya": "MRU",
  "Mauritian Rupee": "MUR",
  "Maldivian Rufiyaa": "MVR",
  "Malawian Kwacha": "MWK",
  "Mexican Peso": "MXN",
  "Malaysian Ringgit": "MYR",
  "Mozambican Metical": "MZN",
  "Namibian Dollar": "NAD",
  "Nigerian Naira": "NGN",
  "Nicaraguan Córdoba": "NIO",
  "Norwegian Krone": "NOK",
  "Nepalese Rupee": "NPR",
  "New Zealand Dollar": "NZD",
  "Omani Rial": "OMR",
  "Panamanian Balboa": "PAB",
  "Peruvian Nuevo Sol": "PEN",
  "Papua New Guinean Kina": "PGK",
  "Philippine Peso": "PHP",
  "Pakistani Rupee": "PKR",
  "Polish Zloty": "PLN",
  "Paraguayan Guarani": "PYG",
  "Qatari Rial": "QAR",
  "Romanian Leu": "RON",
  "Serbian Dinar": "RSD",
  "Russian Ruble": "RUB",
  "Rwandan Franc": "RWF",
  "Saudi Riyal": "SAR",
  "Solomon Islands Dollar": "SBD",
  "Seychellois Rupee": "SCR",
  "Sudanese Pound": "SDG",
  "Swedish Krona": "SEK",
  "Singapore Dollar": "SGD",
  "Saint Helena Pound": "SHP",
  "Sierra Leonean Leone": "SLL",
  "Somali Shilling": "SOS",
  "Surinamese Dollar": "SRD",
  "South Sudanese Pound": "SSP",
  "São Tomé and Príncipe Dobra (pre-2018)": "STD",
  "São Tomé and Príncipe Dobra": "STN",
  "Salvadoran Colón": "SVC",
  "Syrian Pound": "SYP",
  "Swazi Lilangeni": "SZL",
  "Thai Baht": "THB",
  "Tajikistani Somoni": "TJS",
  "Turkmenistani Manat": "TMT",
  "Tunisian Dinar": "TND",
  "Tongan Pa'anga": "TOP",
  "Turkish Lira": "TRY",
  "Trinidad and Tobago Dollar": "TTD",
  "New Taiwan Dollar": "TWD",
  "Tanzanian Shilling": "TZS",
  "Ukrainian Hryvnia": "UAH",
  "Ugandan Shilling": "UGX",
  "United States Dollar": "USD",
  "Uruguayan Peso": "UYU",
  "Uzbekistan Som": "UZS",
  "Venezuelan Bolívar Soberano": "VES",
  "Vietnamese Dong": "VND",
  "Vanuatu Vatu": "VUV",
  "Samoan Tala": "WST",
  "CFA Franc BEAC": "XAF",
  "East Caribbean Dollar": "XCD",
  "Special Drawing Rights": "XDR",
  "CFA Franc BCEAO": "XOF",
  "CFP Franc": "XPF",
  "Yemeni Rial": "YER",
  "South African Rand": "ZAR",
  "Zambian Kwacha": "ZMW",
  "Zimbabwean Dollar": "ZWL"
};
// Ana bileşenimiz olan CurrencyConverter fonksiyon bileşeni.
const CurrencyConverter = () => {
  // State hook'larını kullanarak bileşenin state'lerini tanımlıyoruz.
  const [amount, setAmount] = useState(""); // Dönüştürülecek miktarı saklamak için.
  const [fromCurrency, setFromCurrency] = useState("USD"); // Dönüştürülecek para birimini saklamak için.
  const [toCurrency, setToCurrency] = useState("EUR"); // Dönüştürülen para birimini saklamak için.
  const [result, setResult] = useState(""); // Dönüştürülen sonucu saklamak için.
  const [error, setError] = useState(null); // Hata durumlarını saklamak için.

  // Input alanındaki miktar değiştiğinde çalışacak fonksiyon.
  const handleAmountChange = (e) => {
    setAmount(e.target.value); // setAmount fonksiyonu ile inputa girilen deger ile State'i güncelliyoruz.
  };

  // Kaynak para birimi değiştiğinde çalışacak fonksiyon.
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value); // State'i güncelliyoruz.
  };

  // Hedef para birimi değiştiğinde çalışacak fonksiyon.
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value); // State'i güncelliyoruz.
  };

  // Para birimini dönüştüren fonksiyon.
  const convertCurrency = async () => {
    try {
      // API'den döviz kurlarını almak için istek gönderiyoruz.
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );

      // API'den gelen verileri kullanarak dönüşümü gerçekleştiriyoruz.
      const rate = response.data.rates[toCurrency];
      
      // Eğer dönüştürme kuru mevcut değilse hata oluşturuyoruz.
      if (!rate) {
        setError("Exchange rate not available for selected currencies.");
        return;
      }

      // Sonucu hesaplayıp state'e kaydediyoruz.
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount.toFixed(2)); // İki ondalık basamaklı olarak yuvarlıyoruz.
      setError(null); // Herhangi bir hata yoksa hata durumunu sıfırlıyoruz.
    } catch (error) {
      console.error("Error converting currency:", error);
      setError("Error converting currency. Please try again."); // Hata durumunu güncelliyoruz.
    }
  };

  // Form gönderildiğinde çalışacak fonksiyon.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelliyoruz.
    await convertCurrency(); // Para birimini dönüştürme fonksiyonunu çağırıyoruz.
  };

  // JSX içinde kullanılacak bileşenin render edildiği kısım.
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Currency Converter</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="mb-1">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="fromCurrency" className="mb-1">From:</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="border border-gray-300 px-3 py-2 rounded-md"
          >
            {/* Kaynak para birimlerini dropdown listesi olarak oluşturuyoruz. */}
            {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="toCurrency" className="mb-1">To:</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="border border-gray-300 px-3 py-2 rounded-md"
          >
            {/* Hedef para birimlerini dropdown listesi olarak oluşturuyoruz. */}
            {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Convert</button>
      </form>
      {/* Dönüştürülen sonucu gösteriyoruz. */}
      {result && <p className="text-green-500">Result: {result}</p>}
      {/* Hata durumunu gösteriyoruz. */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

// CurrencyConverter bileşenini dışa aktarıyoruz.
export default CurrencyConverter;