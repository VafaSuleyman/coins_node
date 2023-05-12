const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const JSONStream = require('JSONStream');

const app = express();

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'vefa',
  password: 'azerbaycan111',
  database: 'coins'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('MySQL veritabanına bağlantı başarılı!');
});


//JSON formatındaki məlumatlar arrayə toplanılır.

const coins = [
  {
      "Type": "Memorable",
      "Name": "Canadian Beaver",
      "Description_title": "Canadian beaver. Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.",
      "Description": "In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark. <br> In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription 5 cents between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.",
      "Issuing_country": "CANADA",
      "Composition": "nickel",
      "Quality": "BU",
      "Denomination": "5 cents",
      "Year": 1965,
      "Weight": "4.54 g",
      "Price": "40",
      "Images": [
  { 
      "FileName":     "Canadian_Beaver_1.png",
      "FileName2":     "Canadian_Beaver_2.png",
      "URL":     "/images/Canadian_Beaver_1.png"
  }
    ]
  },

  {
      "Type": "Memorable",
      "Name": "Looney",
      "Description_title": "Looney. Unique coin with the image of a goat. Canadian dollar symbol. ",
      "Description": "The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle Canadian dollar. The obverse depicts Queen Elizabeth II.<br> The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.",
      "Issuing_country": "CANADA",
      "Composition": "gold",
      "Quality": "BU",
      "Denomination": "1 dollar",
      "Year": 1970,
      "Weight": "5.4 g",
      "Price": "65",
      "Images": [
  { 
      "FileName":     "Looney_1.png",
      "FileName2":     "Looney_2.png",
      "URL":     "/images/Looney_1.png"
  }
    ]
  },

  {
      "Type": "Memorable",
      "Name": "Jefferson",
      "Description_title": "Unique coin featuring Thomas Jefferson, the 3rd American president. Face value - 5 cents. ",
      "Description": "The obverse of the coin depicts a bust of the 3rd American president, Thomas Jefferson. The inscription on the right semicircle IN GOD WE TRUST Below is the inscription FREEDOM and the year of minting. Under the image of Jefferson was a monogram of an engraver.<br> The initials of the engraver FS first appeared on coins in 1966. The reverse side shows the Jefferson Monticello estate, as well as the inscription: on the top - the motto E PLURIBUS UNUM, on the bottom - the inscriptions MONTICELLO, FIVE CENTS and UNITED STATES OF AMERICA.",
      "Issuing_country": "UNITED STATES OF AMERICA",
      "Composition": "nickel",
      "Quality": "BU",
      "Denomination": "5 cents",
      "Year": 1966,
      "Weight": "3.54 g",
      "Price": "35",
      "Images": [
  { 
      "FileName":     "Jefferson_1.png",
      "FileName2":     "Jefferson_2.png",
      "URL":     "/images/Jefferson_1.png"
  }
    ]
  }, 

  {
  "Type": "Memorable", 
  "Name": "Kennedy", 
  "Description_title": "The unique coin is made in honor of the assassination of the 35th president of Texas. ",
  "Description": "On November 22, 1963, in connection with the assassination of the 35th President John F. Kennedy in Dallas (Texas), it was decided to perpetuate the memory of President Kennedy on a coin. <br>On the obverse to the right is a portrait of the 35th President of the United States, John F. Kennedy. Captions: FREEDOM / IN GOD WE TRUST / 1993. The reverse depicts the US state emblem (bald eagle with a shield) in the ring of stars. Captions: UNITED STATES OF AMERICA / E PLURIBUS UNUM / HALF DOLLAR.",
  "Issuing_country": "UNITED STATES OF AMERICA", 
  "Composition": "nickel", "Quality": "BU", "Denomination": "HALF DOLLAR", 
  "Year": "1963", "Weight": "4.3 g", 
  "Price": "43" ,
      "Images": [
  { 
      "FileName":     "Kennedy_1.png",
      "FileName2":     "Kennedy_2.png",
      "URL":     "/images/Kennedy_1.png"
  }
    ]
  },

  { 
  "Type": "Memorable", 
  "Name": "Canadian Cent",
  "Description_title": "Canadian cent. A unique coin with the image of maple leaves - symbols of Canada.",
  "Description": "Face value - 1 cent.\n\nOn May 3, 2012, the Department of the Treasury of Canada announced the cessation of production of a 1 cent coin. The latest issues of the famous 1-cent maple leaf were minted in 2012.\n\nOn the reverse, in the center of the coin are two maple leaves (the symbol of Canada), the year of issue is 2012 on the left.<br> The upper part of the coin shows the denomination: 1 cent (1 cent), in the lower part of the inscription in a semicircle: CANADA.\n\nOn the obverse in the center of the coin on the right is a portrait of Queen Elizabeth II. Along the edge of the coin there is an inscription: Elizabeth II D G REGINA.", 
  "Issuing_country": "CANADA",
  "Composition": "Steel", 
  "Quality": "BU", 
  "Denomination": "1 cent", 
  "Year": "1965", 
  "Weight": "2.7 g",
  "Price": "8",
      "Images": [
  { 
      "FileName":     "Canadian Cent_1.png",
      "FileName2":     "Canadian Cent_2.png",
      "URL":     "/images/Canadian Cent_1.png"
  }
    ]
  },

  { 
  "Type": "Memorable", 
  "Name": "A penny", 
  "Description_title": "A penny. A unique coin with a shield image with 13 vertical stripes.",
  "Description": "Minted from 1793 to the present day. In 1959, on the 150th anniversary of the birth of Lincoln, the reverse design was changed. Instead of wheat spikelets, the image of the Lincoln Memorial was depicted on the coin. On the surviving copies you can see the image of the statue of the 16th American president between the columns. <br>Coins of this type were minted in multi-billion copies until 2008.Another round date (200 years since the birth) was marked by the minting of 4 coins, which symbolized the periods of life of Abraham Lincoln. In 2010, the design of the coin was changed - the reverse depicts a shield with 13 vertical stripes, symbolizing the state and national unity.\n ", 
  "Issuing_country": "UNITED STATES OF AMERICA", 
  "Composition": "Steel", 
  "Quality": "BU", 
  "Denomination": "1 cent", 
  "Year": 1793, 
  "Weight": "5.1 g", 
  "Price": "8",
  "Images": [
  { 
      "FileName":     "A_penny_1.png",
      "FileName2":     "A_penny_2.png",
      "URL":     "/images/A_penny_1.png"
  }
    ]
  },

  { 
  "Type": "Memorable", 
  "Name": "25 cents", 
  "Description_title": "Unique coin depicting a caribou (reindeer).",
  "Description": "The face value of the coin is equal to a quarter of the Canadian dollar. The obverse depicts Queen Elizabeth II. The caribou (reindeer) is depicted on the reverse. A modern design (with a deer) has been used since the time of King George VI, when the design of other Canadian coins also changed. Under previous kings, a different design was used for coins from 5 to 50 cents. <br>On the reverse side was the name of the coin in small letters, framed by maple leaves, with a crown at the top. Ordinary quarters are minted with a caribou on the back. In 2004, Memorial Day was released. The reverse shows a poppy flower.", 
  "Issuing_country": "CANADA", 
  "Composition": "nickel", 
  "Quality": "BU", 
  "Denomination": "25 cents",
  "Year": 1966, 
  "Weight": "5.7 g", 
  "Price": "80",
  "Images": [
  { 
      "FileName":     "25 cents_1.png",
      "FileName2":     "25 cents_2.png",
      "URL":     "/images/25 cents_1.png"
  }
    ]
  },

  { 
  "Type": "Memorable", 
  "Name": "Dim Sum", 
  "Description_title": "Dim Sum is a 10-cent coin of the United States that has been minted from 1946 to the present.",
  "Description": "This is a unique coin with the image of a torch, oak and olive branches. The obverse of the coin depicts a portrait of the 32nd President of the United States, Franklin D. Roosevelt, and the reverse depicts a torch, oak and olive branches above the motto “E pluribus unum” - “Out of many.” <br>After the death of Franklin Roosevelt in 1945, it was decided to put his image on a coin to perpetuate his memory. The choice of a coin denomination of 10 cents was due to the fact that in 1938 Roosevelt made a lot of efforts to create the National Fund Fund, which is half joking, and since 1979 it has been officially called the “March of ten cents”.", 
  "Issuing_country": "UNITED STATES OF AMERICA", 
  "Composition": "nickel", 
  "Quality": "BU", 
  "Denomination": "10 cents", 
  "Year": 1946, 
  "Weight": "4.25 g",
  "Price": "10",
  "Images": [
  { 
      "FileName":     "Dim Sum_1.png",
      "FileName2":     "Dim Sum_2.png",
      "URL":     "/images/Dim Sum_1.png"
  }
    ]
  },

  {
    "Type": "Investments",
    "Name": "South Vietnamese Dong",
    "Description_title": "Currency of the Republic of Vietnam in 1955-1975 Coin with the image of  wheat.",
    "Description": "Currency of the Republic of Vietnam in 1955-1975. On the front side, we see wheat, and on the back, a unit symbolizing money.  The monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Banknotes of the graduating institute were issued in three types: Cambodian, Lao and Vietnamese. <br>The inscriptions on the banknotes of all samples were made in four languages: French, Khmer, Lao and Vietnamese. Vietnamese-style banknotes depicted a pattern, as well as the inscription “VIÊN PHÁT-HÀNH”. Piastres previously issued by the French Bank of Indochina were also in circulation.",
    "Issuing_country": "The Republic of Vietnam",
    "Composition": "Nickel",
    "Quality": "BU",
    "Denomination": "1 Dong",
    "Year": 1955,
    "Weight": "5.05 g",
    "Price": "56",
  "Images": [
  { 
      "FileName":     "South Vietnamese Dong_1.png",
      "FileName2":     "South Vietnamese Dong_2.png",
      "URL":     "/images/South Vietnamese Dong_1.png"
  }
    ]
  },

  {
    "Type": "Investments",
    "Name": "The British Antelope",
    "Description_title": "Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound.",
    "Description": "It has been produced since 1952. On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX. <br>On the other side of the coin is an Antelope. Around it is the inscription SOUTH AFRICA 1952 SUID AFRICA, dotted with dots. Below is the nominal value.",
    "Issuing_country": "British South Africa",
    "Composition": "gold",
    "Quality": "BU",
    "Denomination": "1/2 pound",
    "Year": 1952,
    "Weight": "6.3 g",
    "Price": "78",
   "Images": [
  { 
      "FileName":     "The British Antelope_1.png",
      "FileName2":     "The British Antelope_2.png",
      "URL":     "/images/The British Antelope_1.png"
  }
   ]
  },

  {
      "Type": "Investments",
      "Name": "Cron",
      "Description_title": "A unique coin depicting a Knorr Viking ship at sea.",
      "Description": "Coin 1 crown was issued from August 1, 1934 to March 25, 1941, during the first period of Estonia’s independence. On the obverse of the coin in the center is a large state seal, the emblem of Estonia, crowned with an arched text with the inscription “Eesti Vabariik”, and on the lower edge - the year of issue “1934”. <br>The reverse depicts a Viking ship Knarr in the sea, under which appears the inscription 1 crown. In 2012, a single crown coin. 1934 was recognized as “the most beautiful coin ever circulated in Estonia.”",
      "Issuing_country": "Estonia",
      "Composition": "gold",
      "Quality": "BU",
      "Denomination": "1/2 pound",
      "Year": 1934,
      "Weight": "5.67 g",
      "Price": "79",
  "Images": [
  { 
      "FileName":     "Cron_1.png",
      "FileName2":     "Cron_2.png",
      "URL":     "/images/Cron_1.png"
  }
  ]
  },

  {
  "Type": "Investments",
  "Name": "Franc", 
  "Description_title": "Unique coin with the image of a walking elephant.",
  "Description": "Frank of the Belgian Congo. On the reverse of the coin in its central part there is an inscription in French: 2 francs - 2 francs, framed by a five-pointed star. Along the edge from left to right there is an inscription in French and Dutch in two lines: “BANQUE DU CONGO BELGE”, “BANQUE VAN BELGISCH CONGO” - Bank of the Belgian Congo. <br>The edge of the coin is decorated with decorative teeth. On the reverse of the coin in the central part is a walking elephant. The year of minting is located under it: 1947. The edge is uneven.",
  "Issuing_country": "the Belgian Congo", 
  "Composition": "gold", 
  "Quality": "BU",
  "Denomination": "2 francs", 
  "Year": 1947, 
  "Weight": "5.45 g", 
  "Price": "68",
  "Images": [
  { 
      "FileName":     "Franc_1.png",
      "FileName2":     "Franc_2.png",
      "URL":     "/images/Franc_1.png"
  }
  ]
  }, 

  { 
  "Type": "Investments", 
  "Name": "Stork", 
  "Description_title": "Unique coin with the image of a flying stork.",
  "Description": "French coin at 2 two francs 1997. Two francs by Georges Gynemer - a commemorative coin of two French francs, issued in 1997 in honor of the famous pilot of the First World War, Georges Gynemer, on the occasion of the 80th anniversary of the officer cross of the Legion of Honor and his death: shot down in flight by a German plane. They are painted by engravers of the workshop of coins and medals under the direction of the general engraver of coins Pierre Rodier 4. <br>The obverse depicts a portrait of Georges Gainemer in a flight suit and pilot s glasses, raised to his forehead. The inscription GEORGES GUYNEMER 1894-1917 in a semicircle at the top of the coin. And also the year of release below. The reverse shows a flying stork. Also below the arc is the inscription LIBERTÉ ÉGALITÉ FRATERNITÉ, separated by dots. And the face value at the top of the coin. ", 
  "Issuing_country": "France", 
  "Composition": "steel", 
  "Quality": "BU", 
  "Denomination": "2 francs", 
  "Year": 1997, 
  "Weight": "6.57 g", 
  "Price": "54",
  "Images": [
  { 
      "FileName":     "Stork_1.png",
      "FileName2":     "Stork_2.png",
      "URL":     "/images/Stork_1.png"
  }
  ]
  }, 

  { 
  "Type": "Investments", 
  "Name": "Gyeonggi", 
  "Description_title": "Gyeonggi. Coin with the image of five kangaroos - symbols of Australia.",
  "Description": "The first Australian coin with a nominal value of 1 dollar was introduced on May 13, 1984 to replace a one-dollar banknote. The portraits of Elizabeth II on the obverse of the 1984, 1985 and 1988 coins were made by Arnold Machin, and on the 1999 coins by Ian Rank-Broadley. The reverse of the coin depicts five kangaroos symbolizing Australia. <br>The drawing was designed by Stuart Devlin in 1966. The first Australian $ 1 coin was introduced on May 13, 1984 to replace a one-dollar bill. This is currently the most common coin denomination in Australia.", 
  "Issuing_country": "Australia", 
  "Composition": "gold", 
  "Quality": "BU", 
  "Denomination": "1 dollar", 
  "Year": 1984, 
  "Weight": "4.76 g", 
  "Price": "97",
  "Images": [
  { 
      "FileName":     "Gyeonggi_1.png",
      "FileName2":     "Gyeonggi_2.png",
      "URL":     "/images/Gyeonggi_1.png"
  }
  ]
  },

  {   
    "Type": "Investments",
    "Name": "Bolivian Peso",
    "Description_title": "Boliviano Coin with the image of Bolivia.",
    "Description": "By 1987, the Bolivian peso had completely depreciated and was replaced by a new boliviano during another monetary reform. Old banknotes were printed and used as a \"bargaining chip.\" And in 1988, they began to mint a real coin. This currency is still in circulation. At the top of one of the sides of the coin in a semicircle is the inscription REPUBLICADE BOLIVIA. <br>At the bottom of the coin, an arc depicts 10 stars. Above, on the other side of the coin, the inscription PESO BOLIVIANO is located in an arc. In the middle is an image of face value. At the bottom of the year, framed on both sides by branches.",
    "Issuing_country": "Bolivia",
    "Composition": "steel",
    "Quality": "BU",
    "Denomination": "1 PESO",
    "Year": "1988",
    "Weight": "3.62 g",
    "Price": "54",
  "Images": [
  { 
      "FileName":     "Bolivian Peso_1.png",
      "FileName2":     "Bolivian Peso_2.png",
      "URL":     "/images/Bolivian Peso_1.png"
  }
  ]
  },

  {
      "Type": "Investments",
      "Name": "Botswana",
      "Description_title": "Coin with the image of a bird. Coin of state of Botswana 1976.",
      "Description": "Translated from Botswana, its name means “let it rain”. After gaining independence from the United Kingdom in 1966, Botswana was a member of currency unions. In 2005, as a result of inflation, the currency fell by 12%, but it still remains one of the “strong” currencies on the African continent.",
      "Issuing_country": "Botswana",
      "Composition": "steel",
      "Quality": "BU",
      "Denomination": "1 thebe",
      "Year": 1976,
      "Weight": "4.28 g",
      "Price": "62",
  "Images": [
  { 
      "FileName":     "Botswana_1.png",
      "FileName2":     "Botswana_2.png",
      "URL":     "/images/Botswana_1.png"
  }
  ]
  },

  {
    "Type": "Investments",
    "Name": "Virginia",
    "Description_title": "Virginia Coin with the image of a seahorse.",
    "Description": "Coin created during the reign of Elizabeth II. The obverse depicts Her Majesty Queen Elizabeth II. At the top of the coin is the inscription British Virgin Islands Queen Elizabeth II 2014. The reverse depicts a beautiful seahorse with a tail wrapped around a coral. <br>The choice of seahorse reflects the marine heritage of the British Virgin Islands. The British Virgin Islands, located in the Caribbean Sea and consisting of more than 60 islands, are known for their coral reefs, which are home to a wide variety of animal species, including seahorses. Seahorse is the name given to 54 species of marine fish in the genus Hippocampus, which comes from the ancient Greek hippos, which means “horse”, and Campos - “sea monster”.",
    "Issuing_country": "British Virgin Islands",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "5 dollars",
    "Year": "2014",
    "Weight": "6.98 g",
    "Price": "108",
  "Images": [
  { 
      "FileName":     "Virginia_1.png",
      "FileName2":     "Virginia_2.png",
      "URL":     "/images/Virginia_1.png"
  }
  ]
  },

  {
    "Type": "Investments",
    "Name": "Theobroma Cocoa",
    "Description_title": "Coin with a lion in the center of the shield.",
    "Description": "Ghana coin, published in 1967. The reverse depicts a runaway lion in the center of a shield divided into four parts, separating the date and the face value. The inscription at the top of the coin is TWENTY. <br>As for the images inside the coat of arms: upper left: sword (used by chieftains) and staff (used by a linguist for ceremonial events) top right: OSU castle at sea (Presidential Palace), bottom left: cocoa tree (agricultural wealth of Ghana). Bottom right: a gold mine (rich in industrial minerals and natural resources) in Ghana. The Golden Lion and George intersect in the center (a permanent connection between Ghana and the Commonwealth of Nations).",
    "Issuing_country": "Ghana",
    "Composition": "steel",
    "Quality": "BU",
    "Denomination": "20 pesewas",
    "Year": 1962,
    "Weight": "4.76 g",
    "Price": "54",
  "Images": [
  { 
      "FileName":     "Theobroma Cocoa_1.png",
      "FileName2":     "Theobroma Cocoa_2.png",
      "URL":     "/images/Theobroma Cocoa_1.png"
  }
  ]
  },

  {
      "Type": "Investments",
      "Name": "Coin of the Weimar Republic",
      "Description_title": "The Hindenburg Coin with the coat of arms of the Weimar Republic.",
      "Description": "On the obverse, in the center of the coin, at the top is the coat of arms of the Weimar Republic. In the center below is the coat of arms of the Hindenburg family. This is a shield divided into 4 fields - in the upper left and lower right corners there is a head of a bull.<br>On the reverse side is a portrait of Paul von Hindenburg (1847–1934), Field Marshal, President of the Weimar Republic in 1925–1934 (right). Along the edge of the coin is a semicircle of date: 1847-1927 and the inscription: * * REICHSPRASIDENT * VON * HINDENBURG •. At the bottom left of the portrait is a letter denoting a German mint.",
      "Issuing_country": "the Weimar Republic",
      "Composition": "silver",
      "Quality": "BU",
      "Denomination": "5 Mark",
      "Year": 1927,
      "Weight": "4.76 g",
      "Price": "142",
  "Images": [
  { 
      "FileName":     "Coin of the Weimar Republic_1.png",
      "FileName2":     "Coin of the Weimar Republic_2.png",
      "URL":     "/images/Coin of the Weimar Republic_1.png"
  }
  ]
  },

  {
    "Type": "Investments",
    "Name": "Scientist",
    "Description_title": "Silver Egyptian coin with the image of the god Thoth.",
    "Description": "Silver Egyptian coin. Face value one pound. It has been produced since 1981. The coin shows the name of the country and its meaning in Arabic. Also depicted is the Egyptian god Thoth. <br>On the other side is a travel plate left by a radiant sun gear and splatter. The Egyptian pound is often shortened as LE or L. E., which means livre égyptienne (French for Egyptian pound).",
      "Issuing_country": "Egypt",
      "Composition": "silver",
      "Quality": "BU",
      "Denomination": "1 pound",
      "Year": 1981,
      "Weight": "3.95 g",
      "Price": "112",
  "Images": [
  { 
      "FileName":     "Scientist_1.png",
      "FileName2":     "Scientist_2.png",
      "URL":     "/images/Scientist_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Lion sedge",
    "Description_title": "Indian coin with the image of a lion Ashoka.",
    "Description": "Face value 1 one rupee. 1975 edition. It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain. <br>The rupee (from Sanskrit silver) is an Indian historical silver coin, put into circulation in the 15th century, as well as the monetary unit of a number of countries in South Asia. After the British conquest of Burma in 1852, the Indian rupee became its currency. <br>In 1938, Burma became an independent British colony. A year earlier, the release of the Burmese rupee, which lasted until 1952, began. In 1952, the Burmese rupee was replaced by a kyat. The rupee remained the currency of Portuguese possessions in India until 1959, when it was replaced by the escudos of Portuguese India.",
    "Issuing_country": "India",
    "Composition": "steel",
    "Quality": "BU",
    "Denomination": "1 rupee",
    "Year": "1975",
    "Weight": "4.95 g",
    "Price": "76",
  "Images": [
  { 
      "FileName":     "Lion sedge_1.png",
      "FileName2":     "Lion sedge_2.png",
      "URL":     "/images/Lion sedge_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Rial",
    "Description_title": "Iranian silver coin with the image of a lion.",
    "Description": "Face value 5000 five thousand dinars (5 five taps). 1928 year. It depicts a bust of Reza Shah, whose head is turned to the right. On the other side is a lion with a saber in front of the radiant sun. Above it is a crown. <br>Before the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.) Currently, the name fog is used to denote the amount of 10 reais.",
    "Issuing_country": "Iran",
    "Composition": "silver",
    "Quality": "BU",
    "Denomination": "5000 dinars",
    "Year": "1928",
    "Weight": "6.12 g",
    "Price": "98",
  "Images": [
  { 
      "FileName":     "Rial_1.png",
      "FileName2":     "Rial_2.png",
      "URL":     "/images/Rial_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "ISK",
    "Description_title": "Icelandic coin with a picture of a fish.",
    "Description": "Face value 1 Icelandic krona Initially, the krone consisted of 100 Eire (ISL. EYRIR, MN. CH. ISL. Aurar), but since January 1, 1995 Eire has not been used in monetary circulation. From January 1, 1999, in accordance with Law No. 36 of April 27, 1998, amounts must be rounded to 50 Eire. Coin minting in Krona began in 1925. <br>Initially, all coins had a monogram of King Christian X. Iceland was declared a Republic in 1944, and in 1946 it began to mint coins without royal symbols. Icelandic coins were minted by the Royal Mint of Denmark, the Royal Mint of Great Britain and a private mint in Birmingham.",
    "Issuing_country": "Iceland",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "1 Icelandic krona",
    "Year": 2007,
    "Weight": "5.42 g",
    "Price": "78",
  "Images": [
  { 
      "FileName":     "ISK_1.png",
      "FileName2":     "ISK_2.png",
      "URL":     "/images/ISK_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Yemen",
    "Description_title": "Coin of South Arabia (Yemen) with the image of a viral boat.",
    "Description": "Coin in 25 twenty five fils. An octagonal star with dots is depicted on one side of the coin. On the other side, a sailboat divides bills into English and Arabic. Until 1951, Indian rupee and East African shilling traded in the British colony of Aden. <br>In 1951, East African shilling was declared the only legal tender in Aden. In 1959, the Federation of the United Arab Emirates of the South was formed, which was transformed into the Federation of South Arabia in 1962. Aden joined the Federation in 1963. In April 1965, the South Arabian Dinar was issued and published by the South Arabian Monetary Authority. East African shillings were exchanged for dinars until July 1, 1965 at a ratio of 20 shillings = 1 dinar. Dinar was equated to pound.",
    "Issuing_country": "Yemen",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "25 fils",
    "Year": "1964",
    "Weight": "5.47 g",
    "Price": "69",
  "Images": [
  { 
      "FileName":     "Yemen_1.png",
      "FileName2":     "Yemen_2.png",
      "URL":     "/images/Yemen_1.png"
  }
  ]
  }, 

  {
    "Type": "Exclusive",
    "Name": "Woman",
    "Description_title": "1 yuan Chinese coin with a picture of a woman. 1986 edition.",
    "Description": "On one side of the coin is a woman sitting on a stone. Doves fly around her. On the other side is a Chinese weapon with stars. Today, the term yuan usually refers to the main unit of account of the renminbi (renminbi), the currency of the People’s Republic of China. Yuan banknotes start at one yuan and go up to 100 yuan. <br>The yuan symbol is also used in Chinese to denote the monetary units of Japan (yen) and Korea (won) and is used to convert the currency to the dollar, as well as to some other currencies; for example, the US dollar is called in Chinese meiyuan.",
    "IssuingCountry": "China",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "1 yuan",
    "Year": 1986,
    "Weight": "6.02 g",
    "Price": "48",
  "Images": [
  { 
      "FileName":     "Woman_1.png",
      "FileName2":     "Woman_2.png",
      "URL":     "/images/Woman_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Alligator",
    "Description_title": "Chinese coin with the image of an alligator.",
    "Description": "5 yuan Chinese coin. 1998 edition. It depicts a Chinese alligator on the banks of the river. On the other side is a Chinese weapon with stars. It is surrounded by hieroglyphs and a coin release date.",
    "Issuing_country": "China",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "5 yuan",
    "Year": 1998,
    "Weight": "7.24 g",
    "Price": "78",
    "Images": [
  { 
      "FileName":     "Alligator_1.png",
      "FileName2":     "Alligator_2.png",
      "URL":     "/images/Alligator_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "The Golden Panda",
    "Description_title": "Chinese coin with the image of two pandas.",
    "Description": "5 yuan Chinese coin. 1993 edition. On one side of the coin are two pandas. At the top of the coin are Chinese characters in an arc. On the other side is a Chinese weapon with stars, surrounded by hieroglyphs. <br>Below is written the year of release. Chinese Golden Panda, launched in 1982. Coins (front side) remain unchanged since 1992. There is also a Silver Panda investment coin series, made in a similar design.",
    "Issuing_country": "China",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "5 yuan",
    "Year": 1993,
    "Weight": "7.24 g",
    "Price": "82",
    "Images": [
  { 
      "FileName":     "The Golden Panda_1.png",
      "FileName2":     "The Golden Panda_2.png",
      "URL":     "/images/The Golden Panda_1.png"
  }
  ]
  },

  {
      "Type": "Exclusive",
      "Name": "Costa Rica",
      "Description_title": "Costa Rican coin with the image of manatee.",
      "Description": "Costa Rican coin of 100 columns. It has been produced since 1974.On one side of the coin is a shield with a sailing ship in front of the mountains. Below is the release date of the coin.<br>On the other side of the coin is a manatee among algae.\n\nThe Costa Rican coin is the monetary unit of Costa Rica. Until 2017, the All-Russian classifier of currencies is the \"Costa Rican Colony\".",
      "Issuing_country": "Costa Rica",
      "Composition": "nickel",
      "Quality": "BU",
      "Denomination": "100 columns",
      "Year": "1974",
      "Weight": "5.24 g",
      "Price": "78",
      "Images": [
  { 
      "FileName":     "Costa Rica_1.png",
      "FileName2":     "Costa Rica_2.png",
      "URL":     "/images/Costa Rica_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Year of the children",
    "Description_title": "Costa is an African coin depicting three chicks in a nest.",
    "Description": "Costa Rican coin of 100 columns. It has been produced since 1979. On one side of the coin are 3 chicks in a nest, symbolizing the International Year of Children. <br>On the other side is a shield with a sailing ship in front of the mountains, the shining sun behind the mountains. In circulation are banknotes: 1000 columns of series A and B (red, polymer), 2000 columns (blue with a shark of Mauro Fernandez on one side and a bull shark on the back), 5000 columns of series A and B (yellow with Alfredo González Flores) with one side and capuchin monkeys on the back), 10,000 columns (green), 20,000 columns and 50,000 columns. In the monetary circulation of the country are coins in denominations of 500, 100, 50, 25, 20, 10, 5 and 1 column.",
    "Issuing_country": "Costa Rica",
    "Composition": "nickel",
    "Quality": "BU",
    "Denomination": "100 columns",
    "Year": "1979",
    "Weight": "5.24 g",
    "Price": "72",
    "Images": [
  { 
      "FileName":     "Year of the children_1.png",
      "FileName2":     "Year of the children_2.png",
      "URL":     "/images/Year of the children_1.png"
  }
  ]
  },

  {
    "Type": "Exclusive",
    "Name": "Sailboat",
    "Description_title": "Portuguese silver coin with the image of a sailing ship.",
    "Description": "Portuguese silver coin in 5 five escudos. It has been produced since 1933. On one side of the coin is a sailing ship floating in the sea. On the other side of the coin is a shield with smaller shields in front of a stylized globe.",
    "Issuing_country": "Portugal",
    "Composition": "silver",
    "Quality": "BU",
    "Denomination": "5 escudos",
    "Year": 1933,
    "Weight": "4.4 g",
    "Price": "134",
    "Images": [
  { 
      "FileName":     "Sailboat_1.png",
      "FileName2":     "Sailboat_2.png",
      "URL":     "/images/Sailboat_1.png"
  }
]
}

]


let dataInserted = false;

// Data əlavə etmək sorğusu
if (!dataInserted) {

  // coins arrayindəki hər coins üçün döngü qurulur

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    let coinJson = JSON.stringify(coin);
    connection.query(`INSERT INTO coins (
      Type,
      Name,
      Description_title,
      Description,
      Issuing_country,
      Composition,
      Quality,
      Denomination,
      Year,
      Weight,
      Price
    ) VALUES (
      '${coin.Type}',
      '${coin.Name}',
      '${coin.Description_title}',
      '${coin.Description}',
      '${coin.Issuing_country}',
      '${coin.Composition}',
      '${coin.Quality}',
      '${coin.Denomination}',
      ${coin.Year},
      '${coin.Weight}',
      '${coin.Price}' 
      )`, (err, result) => {
      if (err) throw err;
      console.log(`Inserted coin with ID ${result.insertId}`);
      console.log(`Inserted ${coin.Name} into Coins table`);

        // coinin id sini tutaraq şəkilləri döngü içərisində əlavə edirik
      const coinId = result.insertId;   
      insertImages(coinId, coin.Images);
    });
  }

  dataInserted = true; // Sorgunun sadəcə bir dəfə çalışması üçün
}


function insertImages(coinId, images) {
  // VALUES hissəsi üçün boş bir array yaradırıq
  const values = [];

  // Her bir şəkil üçün bir dəyər yaradırıq və values arrayinə doldururuq
  images.forEach((image) => {     

    const { FileName, FileName2, URL } = image;
    const data = fs.readFileSync(`./${URL}`).toString('base64');
    values.push([coinId, FileName, FileName2, data]);
  });

  // Bütün şəkilləri tək səfərdə doldururuq
  connection.query('INSERT INTO images (coin_id, file_name, file_name2, data) VALUES ?', [values], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} images for coin ID ${coinId}`);
  });
}



app.get('/coins', (req, res) => {
  // query parameters
  const { id, name, type, composition, description_title, issuing_country, quality, denomination, year, weight, price } = req.query;
  
  // SQL query
  let sql = "SELECT images.file_name, images.file_name2, coins.id, coins.type, coins.name, coins.description_title, coins.description, coins.issuing_country, coins.composition, coins.quality, coins.denomination, coins.year, coins.weight, coins.price FROM coins INNER JOIN images ON coins.id = images.coin_id WHERE 1=1";
  
  // append filters to the SQL query
  if (id) sql += ` AND coins.id = '${id}'`; 
  if (name) sql += ` AND coins.name LIKE '%${name}%'`;
  if (type) sql += ` AND coins.type = '${type}'`;
  if (composition) sql += ` AND coins.composition = '${composition}'`;
  if (description_title) sql += ` AND coins.description_title = '${description_title}'`;
  if (issuing_country) sql += ` AND coins.issuing_country = '${issuing_country}'`;
  if (quality) sql += ` AND coins.quality = '${quality}'`;
  if (denomination) sql += ` AND coins.denomination = '${denomination}'`;
  if (year) sql += ` AND coins.year = '${year}'`;
  if (weight) sql += ` AND coins.weight = '${weight}'`;
  if (price) sql += ` AND coins.price = '${price}'`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


app.get('/coins/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT images.file_name, images.file_name2, coins.id, coins.type, coins.name, coins.description_title, coins.description, coins.issuing_country, coins.composition, coins.quality, coins.denomination, coins.year, coins.weight, coins.price FROM coins INNER JOIN images ON coins.id = images.coin_id WHERE coins.id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});




app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

