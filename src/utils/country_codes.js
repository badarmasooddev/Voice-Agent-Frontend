const countryCodes = [
    {
      "name": "Afghanistan (+93)",
      "code": "+93",
      "key": "AF"
    },
    {
      "name": "Albania (+355)",
      "code": "+355",
      "key": "AL"
    },
    {
      "name": "Algeria (+213)",
      "code": "+213",
      "key": "DZ"
    },
    {
      "name": "Andorra (+376)",
      "code": "+376",
      "key": "AD"
    },
    {
      "name": "Angola (+244)",
      "code": "+244",
      "key": "AO"
    },
    {
      "name": "Antarctica (+672)",
      "code": "+672",
      "key": "AQ"
    },
    {
      "name": "Antigua and Barbuda (+1)",
      "code": "+1",
      "key": "AG"
    },
    {
      "name": "Argentina (+54)",
      "code": "+54",
      "key": "AR"
    },
    {
      "name": "Armenia (+374)",
      "code": "+374",
      "key": "AM"
    },
    {
      "name": "Aruba (+297)",
      "code": "+297",
      "key": "AW"
    },
    {
      "name": "Ascension Island (+247)",
      "code": "+247",
      "key": "AC"
    },
    {
      "name": "Australia (+61)",
      "code": "+61",
      "key": "AU"
    },
    {
      "name": "Austria (+43)",
      "code": "+43",
      "key": "AT"
    },
    {
      "name": "Azerbaijan (+994)",
      "code": "+994",
      "key": "AZ"
    },
    {
      "name": "Bahamas (+1)",
      "code": "+1",
      "key": "BS"
    },
    {
      "name": "Bahrain (+973)",
      "code": "+973",
      "key": "BH"
    },
    {
      "name": "Bangladesh (+880)",
      "code": "+880",
      "key": "BD"
    },
    {
      "name": "Barbados (+1)",
      "code": "+1",
      "key": "BB"
    },
    {
      "name": "Belarus (+375)",
      "code": "+375",
      "key": "BY"
    },
    {
      "name": "Belgium (+32)",
      "code": "+32",
      "key": "BE"
    },
    {
      "name": "Belize (+501)",
      "code": "+501",
      "key": "BZ"
    },
    {
      "name": "Benin (+229)",
      "code": "+229",
      "key": "BJ"
    },
    {
      "name": "Bermuda (+1)",
      "code": "+1",
      "key": "BM"
    },
    {
      "name": "Bhutan (+975)",
      "code": "+975",
      "key": "BT"
    },
    {
      "name": "Bolivia (+591)",
      "code": "+591",
      "key": "BO"
    },
    {
      "name": "Bonaire (+599)",
      "code": "+599",
      "key": "BQ"
    },
    {
      "name": "Bosnia and Herzegovina (+387)",
      "code": "+387",
      "key": "BA"
    },
    {
      "name": "Botswana (+267)",
      "code": "+267",
      "key": "BW"
    },
    {
      "name": "Bouvet Island (+47)",
      "code": "+47",
      "key": "BV"
    },
    {
      "name": "Brazil (+55)",
      "code": "+55",
      "key": "BR"
    },
    {
      "name": "British Indian Ocean Territory (+44)",
      "code": "+44",
      "key": "IO"
    },
    {
      "name": "British Virgin Islands (+1)",
      "code": "+1",
      "key": "VG"
    },
    {
      "name": "Brunei (+673)",
      "code": "+673",
      "key": "BN"
    },
    {
      "name": "Bulgaria (+359)",
      "code": "+359",
      "key": "BG"
    },
    {
      "name": "Burkina Faso (+226)",
      "code": "+226",
      "key": "BF"
    },
    {
      "name": "Burundi (+257)",
      "code": "+257",
      "key": "BI"
    },
    {
      "name": "Cabo Verde (+238)",
      "code": "+238",
      "key": "CV"
    },
    {
      "name": "Cambodia (+855)",
      "code": "+855",
      "key": "KH"
    },
    {
      "name": "Cameroon (+237)",
      "code": "+237",
      "key": "CM"
    },
    {
      "name": "Canada (+1)",
      "code": "+1",
      "key": "CA"
    },
    {
      "name": "Cayman Islands (+1)",
      "code": "+1",
      "key": "KY"
    },
    {
      "name": "Central African Republic (+236)",
      "code": "+236",
      "key": "CF"
    },
    {
      "name": "Chad (+235)",
      "code": "+235",
      "key": "TD"
    },
    {
      "name": "Chile (+56)",
      "code": "+56",
      "key": "CL"
    },
    {
      "name": "China (+86)",
      "code": "+86",
      "key": "CN"
    },
    {
      "name": "Christmas Island (+61)",
      "code": "+61",
      "key": "CX"
    },
    {
      "name": "Cocos (Keeling) Islands (+61)",
      "code": "+61",
      "key": "CC"
    },
    {
      "name": "Colombia (+57)",
      "code": "+57",
      "key": "CO"
    },
    {
      "name": "Comoros (+269)",
      "code": "+269",
      "key": "KM"
    },
    {
      "name": "Congo (+242)",
      "code": "+242",
      "key": "CG"
    },
    {
      "name": "Congo (DRC) (+243)",
      "code": "+243",
      "key": "CD"
    },
    {
      "name": "Cook Islands (+682)",
      "code": "+682",
      "key": "CK"
    },
    {
      "name": "Costa Rica (+506)",
      "code": "+506",
      "key": "CR"
    },
    {
      "name": "Cte d'Ivoire (+225)",
      "code": "+225",
      "key": "CI"
    },
    {
      "name": "Croatia (+385)",
      "code": "+385",
      "key": "HR"
    },
    {
      "name": "Cuba (+53)",
      "code": "+53",
      "key": "CU"
    },
    {
      "name": "Curaao (+599)",
      "code": "+599",
      "key": "CW"
    },
    {
      "name": "Cyprus (+357)",
      "code": "+357",
      "key": "CY"
    },
    {
      "name": "Czechia (+420)",
      "code": "+420",
      "key": "CZ"
    },
    {
      "name": "Denmark (+45)",
      "code": "+45",
      "key": "DK"
    },
    {
      "name": "Djibouti (+253)",
      "code": "+253",
      "key": "DJ"
    },
    {
      "name": "Dominica (+1)",
      "code": "+1",
      "key": "DM"
    },
    {
      "name": "Dominican Republic (+1)",
      "code": "+1",
      "key": "DO"
    },
    {
      "name": "Ecuador (+593)",
      "code": "+593",
      "key": "EC"
    },
    {
      "name": "Egypt (+20)",
      "code": "+20",
      "key": "EG"
    },
    {
      "name": "El Salvador (+503)",
      "code": "+503",
      "key": "SV"
    },
    {
      "name": "Equatorial Guinea (+240)",
      "code": "+240",
      "key": "GQ"
    },
    {
      "name": "Eritrea (+291)",
      "code": "+291",
      "key": "ER"
    },
    {
      "name": "Estonia (+372)",
      "code": "+372",
      "key": "EE"
    },
    {
      "name": "Ethiopia (+251)",
      "code": "+251",
      "key": "ET"
    },
    {
      "name": "Falkland Islands (+500)",
      "code": "+500",
      "key": "FK"
    },
    {
      "name": "Faroe Islands (+298)",
      "code": "+298",
      "key": "FO"
    },
    {
      "name": "Fiji (+679)",
      "code": "+679",
      "key": "FJ"
    },
    {
      "name": "Finland (+358)",
      "code": "+358",
      "key": "FI"
    },
    {
      "name": "France (+33)",
      "code": "+33",
      "key": "FR"
    },
    {
      "name": "French Guiana (+594)",
      "code": "+594",
      "key": "GF"
    },
    {
      "name": "French Polynesia (+689)",
      "code": "+689",
      "key": "PF"
    },
    {
      "name": "Gabon (+241)",
      "code": "+241",
      "key": "GA"
    },
    {
      "name": "Gambia (+220)",
      "code": "+220",
      "key": "GM"
    },
    {
      "name": "Georgia (+995)",
      "code": "+995",
      "key": "GE"
    },
    {
      "name": "Germany (+49)",
      "code": "+49",
      "key": "DE"
    },
    {
      "name": "Ghana (+233)",
      "code": "+233",
      "key": "GH"
    },
    {
      "name": "Gibraltar (+350)",
      "code": "+350",
      "key": "GI"
    },
    {
      "name": "Greece (+30)",
      "code": "+30",
      "key": "GR"
    },
    {
      "name": "Greenland (+299)",
      "code": "+299",
      "key": "GL"
    },
    {
      "name": "Grenada (+1)",
      "code": "+1",
      "key": "GD"
    },
    {
      "name": "Guadeloupe (+590)",
      "code": "+590",
      "key": "GP"
    },
    {
      "name": "Guam (+1)",
      "code": "+1",
      "key": "GU"
    },
    {
      "name": "Guatemala (+502)",
      "code": "+502",
      "key": "GT"
    },
    {
      "name": "Guernsey (+44)",
      "code": "+44",
      "key": "GG"
    },
    {
      "name": "Guinea (+224)",
      "code": "+224",
      "key": "GN"
    },
    {
      "name": "Guinea-Bissau (+245)",
      "code": "+245",
      "key": "GW"
    },
    {
      "name": "Guyana (+592)",
      "code": "+592",
      "key": "GY"
    },
    {
      "name": "Haiti (+509)",
      "code": "+509",
      "key": "HT"
    },
    {
      "name": "Honduras (+504)",
      "code": "+504",
      "key": "HN"
    },
    {
      "name": "Hong Kong SAR (+852)",
      "code": "+852",
      "key": "HK"
    },
    {
      "name": "Hungary (+36)",
      "code": "+36",
      "key": "HU"
    },
    {
      "name": "Iceland (+354)",
      "code": "+354",
      "key": "IS"
    },
    {
      "name": "India (+91)",
      "code": "+91",
      "key": "IN"
    },
    {
      "name": "Indonesia (+62)",
      "code": "+62",
      "key": "ID"
    },
    {
      "name": "Iran (+98)",
      "code": "+98",
      "key": "IR"
    },
    {
      "name": "Iraq (+964)",
      "code": "+964",
      "key": "IQ"
    },
    {
      "name": "Ireland (+353)",
      "code": "+353",
      "key": "IE"
    },
    {
      "name": "Isle of Man (+44)",
      "code": "+44",
      "key": "IM"
    },
    {
      "name": "Israel (+972)",
      "code": "+972",
      "key": "IL"
    },
    {
      "name": "Italy (+39)",
      "code": "+39",
      "key": "IT"
    },
    {
      "name": "Jamaica (+1)",
      "code": "+1",
      "key": "JM"
    },
    {
      "name": "Jan Mayen (+47)",
      "code": "+47",
      "key": "XJ"
    },
    {
      "name": "Japan (+81)",
      "code": "+81",
      "key": "JP"
    },
    {
      "name": "Jersey (+44)",
      "code": "+44",
      "key": "JE"
    },
    {
      "name": "Jordan (+962)",
      "code": "+962",
      "key": "JO"
    },
    {
      "name": "Kazakhstan (+7)",
      "code": "+7",
      "key": "KZ"
    },
    {
      "name": "Kenya (+254)",
      "code": "+254",
      "key": "KE"
    },
    {
      "name": "Kiribati (+686)",
      "code": "+686",
      "key": "KI"
    },
    {
      "name": "Korea (+82)",
      "code": "+82",
      "key": "KR"
    },
    {
      "name": "Kosovo (+383)",
      "code": "+383",
      "key": "XK"
    },
    {
      "name": "Kuwait (+965)",
      "code": "+965",
      "key": "KW"
    },
    {
      "name": "Kyrgyzstan (+996)",
      "code": "+996",
      "key": "KG"
    },
    {
      "name": "Laos (+856)",
      "code": "+856",
      "key": "LA"
    },
    {
      "name": "Latvia (+371)",
      "code": "+371",
      "key": "LV"
    },
    {
      "name": "Lebanon (+961)",
      "code": "+961",
      "key": "LB"
    },
    {
      "name": "Lesotho (+266)",
      "code": "+266",
      "key": "LS"
    },
    {
      "name": "Liberia (+231)",
      "code": "+231",
      "key": "LR"
    },
    {
      "name": "Libya (+218)",
      "code": "+218",
      "key": "LY"
    },
    {
      "name": "Liechtenstein (+423)",
      "code": "+423",
      "key": "LI"
    },
    {
      "name": "Lithuania (+370)",
      "code": "+370",
      "key": "LT"
    },
    {
      "name": "Luxembourg (+352)",
      "code": "+352",
      "key": "LU"
    },
    {
      "name": "Macao SAR (+853)",
      "code": "+853",
      "key": "MO"
    },
    {
      "name": "Madagascar (+261)",
      "code": "+261",
      "key": "MG"
    },
    {
      "name": "Malawi (+265)",
      "code": "+265",
      "key": "MW"
    },
    {
      "name": "Malaysia (+60)",
      "code": "+60",
      "key": "MY"
    },
    {
      "name": "Maldives (+960)",
      "code": "+960",
      "key": "MV"
    },
    {
      "name": "Mali (+223)",
      "code": "+223",
      "key": "ML"
    },
    {
      "name": "Malta (+356)",
      "code": "+356",
      "key": "MT"
    },
    {
      "name": "Marshall Islands (+692)",
      "code": "+692",
      "key": "MH"
    },
    {
      "name": "Martinique (+596)",
      "code": "+596",
      "key": "MQ"
    },
    {
      "name": "Mauritania (+222)",
      "code": "+222",
      "key": "MR"
    },
    {
      "name": "Mauritius (+230)",
      "code": "+230",
      "key": "MU"
    },
    {
      "name": "Mayotte (+262)",
      "code": "+262",
      "key": "YT"
    },
    {
      "name": "Mexico (+52)",
      "code": "+52",
      "key": "MX"
    },
    {
      "name": "Micronesia (+691)",
      "code": "+691",
      "key": "FM"
    },
    {
      "name": "Moldova (+373)",
      "code": "+373",
      "key": "MD"
    },
    {
      "name": "Monaco (+377)",
      "code": "+377",
      "key": "MC"
    },
    {
      "name": "Mongolia (+976)",
      "code": "+976",
      "key": "MN"
    },
    {
      "name": "Montenegro (+382)",
      "code": "+382",
      "key": "ME"
    },
    {
      "name": "Montserrat (+1)",
      "code": "+1",
      "key": "MS"
    },
    {
      "name": "Morocco (+212)",
      "code": "+212",
      "key": "MA"
    },
    {
      "name": "Mozambique (+258)",
      "code": "+258",
      "key": "MZ"
    },
    {
      "name": "Myanmar (+95)",
      "code": "+95",
      "key": "MM"
    },
    {
      "name": "Namibia (+264)",
      "code": "+264",
      "key": "NA"
    },
    {
      "name": "Nauru (+674)",
      "code": "+674",
      "key": "NR"
    },
    {
      "name": "Nepal (+977)",
      "code": "+977",
      "key": "NP"
    },
    {
      "name": "Netherlands (+31)",
      "code": "+31",
      "key": "NL"
    },
    {
      "name": "Netherlands Antilles (Former) (+599)",
      "code": "+599",
      "key": "AN"
    },
    {
      "name": "New Caledonia (+687)",
      "code": "+687",
      "key": "NC"
    },
    {
      "name": "New Zealand (+64)",
      "code": "+64",
      "key": "NZ"
    },
    {
      "name": "Nicaragua (+505)",
      "code": "+505",
      "key": "NI"
    },
    {
      "name": "Niger (+227)",
      "code": "+227",
      "key": "NE"
    },
    {
      "name": "Nigeria (+234)",
      "code": "+234",
      "key": "NG"
    },
    {
      "name": "Niue (+683)",
      "code": "+683",
      "key": "NU"
    },
    {
      "name": "North Macedonia (+389)",
      "code": "+389",
      "key": "MK"
    },
    {
      "name": "Northern Mariana Islands (+1)",
      "code": "+1",
      "key": "MP"
    },
    {
      "name": "Norway (+47)",
      "code": "+47",
      "key": "NO"
    },
    {
      "name": "Oman (+968)",
      "code": "+968",
      "key": "OM"
    },
    {
      "name": "Pakistan (+92)",
      "code": "+92",
      "key": "PK"
    },
    {
      "name": "Palau (+680)",
      "code": "+680",
      "key": "PW"
    },
    {
      "name": "Palestinian Authority (+970)",
      "code": "+970",
      "key": "PS"
    },
    {
      "name": "Panama (+507)",
      "code": "+507",
      "key": "PA"
    },
    {
      "name": "Papua New Guinea (+675)",
      "code": "+675",
      "key": "PG"
    },
    {
      "name": "Paraguay (+595)",
      "code": "+595",
      "key": "PY"
    },
    {
      "name": "Peru (+51)",
      "code": "+51",
      "key": "PE"
    },
    {
      "name": "Philippines (+63)",
      "code": "+63",
      "key": "PH"
    },
    {
      "name": "Poland (+48)",
      "code": "+48",
      "key": "PL"
    },
    {
      "name": "Portugal (+351)",
      "code": "+351",
      "key": "PT"
    },
    {
      "name": "Qatar (+974)",
      "code": "+974",
      "key": "QA"
    },
    {
      "name": "Runion (+262)",
      "code": "+262",
      "key": "RE"
    },
    {
      "name": "Romania (+40)",
      "code": "+40",
      "key": "RO"
    },
    {
      "name": "Russia (+7)",
      "code": "+7",
      "key": "RU"
    },
    {
      "name": "Rwanda (+250)",
      "code": "+250",
      "key": "RW"
    },
    {
      "name": "Saba (+599)",
      "code": "+599",
      "key": "XS"
    },
    {
      "name": "Saint Kitts and Nevis (+1)",
      "code": "+1",
      "key": "KN"
    },
    {
      "name": "Saint Lucia (+1)",
      "code": "+1",
      "key": "LC"
    },
    {
      "name": "Saint Pierre and Miquelon (+508)",
      "code": "+508",
      "key": "PM"
    },
    {
      "name": "Saint Vincent and the Grenadines (+1)",
      "code": "+1",
      "key": "VC"
    },
    {
      "name": "Samoa (+685)",
      "code": "+685",
      "key": "WS"
    },
    {
      "name": "San Marino (+378)",
      "code": "+378",
      "key": "SM"
    },
    {
      "name": "So Tom and Prncipe (+239)",
      "code": "+239",
      "key": "ST"
    },
    {
      "name": "Saudi Arabia (+966)",
      "code": "+966",
      "key": "SA"
    },
    {
      "name": "Senegal (+221)",
      "code": "+221",
      "key": "SN"
    },
    {
      "name": "Serbia (+381)",
      "code": "+381",
      "key": "RS"
    },
    {
      "name": "Seychelles (+248)",
      "code": "+248",
      "key": "SC"
    },
    {
      "name": "Sierra Leone (+232)",
      "code": "+232",
      "key": "SL"
    },
    {
      "name": "Singapore (+65)",
      "code": "+65",
      "key": "SG"
    },
    {
      "name": "Sint Eustatius (+599)",
      "code": "+599",
      "key": "XE"
    },
    {
      "name": "Slovakia (+421)",
      "code": "+421",
      "key": "SK"
    },
    {
      "name": "Slovenia (+386)",
      "code": "+386",
      "key": "SI"
    },
    {
      "name": "Solomon Islands (+677)",
      "code": "+677",
      "key": "SB"
    },
    {
      "name": "Somalia (+252)",
      "code": "+252",
      "key": "SO"
    },
    {
      "name": "South Africa (+27)",
      "code": "+27",
      "key": "ZA"
    },
    {
      "name": "South Sudan (+211)",
      "code": "+211",
      "key": "SS"
    },
    {
      "name": "Spain (+34)",
      "code": "+34",
      "key": "ES"
    },
    {
      "name": "Sri Lanka (+94)",
      "code": "+94",
      "key": "LK"
    },
    {
      "name": "St Helena, Ascension, and Tristan da Cunha (+290)",
      "code": "+290",
      "key": "SH"
    },
    {
      "name": "Sudan (+249)",
      "code": "+249",
      "key": "SD"
    },
    {
      "name": "Suriname (+597)",
      "code": "+597",
      "key": "SR"
    },
    {
      "name": "Svalbard (+47)",
      "code": "+47",
      "key": "SJ"
    },
    {
      "name": "Swaziland (+268)",
      "code": "+268",
      "key": "SZ"
    },
    {
      "name": "Sweden (+46)",
      "code": "+46",
      "key": "SE"
    },
    {
      "name": "Switzerland (+41)",
      "code": "+41",
      "key": "CH"
    },
    {
      "name": "Syria (+963)",
      "code": "+963",
      "key": "SY"
    },
    {
      "name": "Taiwan (+886)",
      "code": "+886",
      "key": "TW"
    },
    {
      "name": "Tajikistan (+992)",
      "code": "+992",
      "key": "TJ"
    },
    {
      "name": "Tanzania (+255)",
      "code": "+255",
      "key": "TZ"
    },
    {
      "name": "Thailand (+66)",
      "code": "+66",
      "key": "TH"
    },
    {
      "name": "Timor-Leste (+670)",
      "code": "+670",
      "key": "TL"
    },
    {
      "name": "Togo (+228)",
      "code": "+228",
      "key": "TG"
    },
    {
      "name": "Tokelau (+690)",
      "code": "+690",
      "key": "TK"
    },
    {
      "name": "Tonga (+676)",
      "code": "+676",
      "key": "TO"
    },
    {
      "name": "Trinidad and Tobago (+1)",
      "code": "+1",
      "key": "TT"
    },
    {
      "name": "Tristan da Cunha (+290)",
      "code": "+290",
      "key": "TA"
    },
    {
      "name": "Tunisia (+216)",
      "code": "+216",
      "key": "TN"
    },
    {
      "name": "Turkey (+90)",
      "code": "+90",
      "key": "TR"
    },
    {
      "name": "Turkmenistan (+993)",
      "code": "+993",
      "key": "TM"
    },
    {
      "name": "Turks and Caicos Islands (+1)",
      "code": "+1",
      "key": "TC"
    },
    {
      "name": "Tuvalu (+688)",
      "code": "+688",
      "key": "TV"
    },
    {
      "name": "U.S. Outlying Islands (+1)",
      "code": "+1",
      "key": "UM"
    },
    {
      "name": "U.S. Virgin Islands (+1)",
      "code": "+1",
      "key": "VI"
    },
    {
      "name": "Uganda (+256)",
      "code": "+256",
      "key": "UG"
    },
    {
      "name": "Ukraine (+380)",
      "code": "+380",
      "key": "UA"
    },
    {
      "name": "United Arab Emirates (+971)",
      "code": "+971",
      "key": "AE"
    },
    {
      "name": "United Kingdom (+44)",
      "code": "+44",
      "key": "GB"
    },
    {
      "name": "United States (+1)",
      "code": "+1",
      "key": "US"
    },
    {
      "name": "Uruguay (+598)",
      "code": "+598",
      "key": "UY"
    },
    {
      "name": "Uzbekistan (+998)",
      "code": "+998",
      "key": "UZ"
    },
    {
      "name": "Vanuatu (+678)",
      "code": "+678",
      "key": "VU"
    },
    {
      "name": "Vatican City (+379)",
      "code": "+379",
      "key": "VA"
    },
    {
      "name": "Venezuela (+58)",
      "code": "+58",
      "key": "VE"
    },
    {
      "name": "Vietnam (+84)",
      "code": "+84",
      "key": "VN"
    },
    {
      "name": "Wallis and Futuna (+681)",
      "code": "+681",
      "key": "WF"
    },
    {
      "name": "Yemen (+967)",
      "code": "+967",
      "key": "YE"
    },
    {
      "name": "Zambia (+260)",
      "code": "+260",
      "key": "ZM"
    },
    {
      "name": "Zimbabwe (+263)",
      "code": "+263",
      "key": "ZW"
    }
  ]

export default countryCodes;