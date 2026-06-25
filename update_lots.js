const fs = require('fs');

const lotsFile = 'data/lots.ts';

const userFeatures = {
  "type": "FeatureCollection",
  "features": [
    {
      "id": "ypgRgZmDbmO8kvEhkLSjioHTiH8h7NvN",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.71195043046447,
              23.80705384291042
            ],
            [
              -110.71146092939252,
              23.80640242394452
            ],
            [
              -110.70540891613912,
              23.8109215757176
            ],
            [
              -110.70594291730876,
              23.81169510845355
            ],
            [
              -110.71195043046447,
              23.80705384291042
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "r3nQEx8tVw7b3ChG5mzaS50MrQJb1ckI",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70540891613912,
              23.810880863340927
            ],
            [
              -110.7153769379679,
              23.803593142226532
            ],
            [
              -110.71475393660374,
              23.802778846311313
            ],
            [
              -110.70474141467756,
              23.810107325752924
            ],
            [
              -110.70540891613912,
              23.810880863340927
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "C2D9yfJ6nGBFNWQgpypYT83QuyxAFsWY",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70483041487235,
              23.810066613120966
            ],
            [
              -110.70402941311832,
              23.80929307068213
            ],
            [
              -110.71381943455721,
              23.8020866907697
            ],
            [
              -110.71467679429963,
              23.802883619360273
            ],
            [
              -110.70483041487235,
              23.810066613120966
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "OJ1xqz3mCpx2eS6V1EJA4H1XRkaKJXt9",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70397926523339,
              23.809326867876436
            ],
            [
              -110.71390127063799,
              23.802009579788262
            ],
            [
              -110.71329993697704,
              23.801321843549033
            ],
            [
              -110.70322759815718,
              23.808501630448973
            ],
            [
              -110.70397926523339,
              23.809326867876436
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "A8HsqQoQCe8sTtGu0WMlyKW4UOfCV0NG",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70319753147729,
              23.808457177490553
            ],
            [
              -110.71326987029673,
              23.801277388133116
            ],
            [
              -110.71263846995298,
              23.800562138336474
            ],
            [
              -110.70256613113312,
              23.807741967232317
            ],
            [
              -110.70319753147729,
              23.808457177490553
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "iWxYgaH9sNWUhz24TKirdsa4R4hY1WQq",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70248726118176,
              23.807666353356694
            ],
            [
              -110.71258966668442,
              23.800541539668103
            ],
            [
              -110.71201839970668,
              23.79985379565585
            ],
            [
              -110.701915994204,
              23.807033663707145
            ],
            [
              -110.70248726118176,
              23.807666353356694
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "BI3dOSNfYmT3Qravov9Q2oU3Ncl6eJve",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70182579415477,
              23.80695113874289
            ],
            [
              -110.71198833302346,
              23.7997437562762
            ],
            [
              -110.71132686599648,
              23.7991660480033
            ],
            [
              -110.70128459385984,
              23.806318445609577
            ],
            [
              -110.70182579415477,
              23.80695113874289
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "qUGa429l64rfTPOEPXoNPR37DlmyWKMx",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70113426044459,
              23.80623592019083
            ],
            [
              -110.71126673263048,
              23.799028498035455
            ],
            [
              -110.71066539896951,
              23.798505806831315
            ],
            [
              -110.70056299346686,
              23.805685749393135
            ],
            [
              -110.70113426044459,
              23.80623592019083
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "QcjiMpQoiPlvLk4Zr4b2CCXu1TFMdI7c",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.70050286010084,
              23.805548206329178
            ],
            [
              -110.7106353322867,
              23.79839576630991
            ],
            [
              -110.71006406530856,
              23.7978180520427
            ],
            [
              -110.69993159312307,
              23.805080558823434
            ],
            [
              -110.70050286010084,
              23.805548206329178
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "hvr3626gbU0fxPswr8f40saljMIpy7M0",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.6999616598059,
              23.804970523871575
            ],
            [
              -110.71003399862573,
              23.79773552122326
            ],
            [
              -110.70943266496478,
              23.797130293612554
            ],
            [
              -110.69933025946212,
              23.804420347713375
            ],
            [
              -110.6999616598059,
              23.804970523871575
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "LNQTT1EGOGGTb5xFh5C2K6GHuOmkv2Yd",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.69939152651168,
              23.80436947891667
            ],
            [
              -110.7094337986483,
              23.79710693237871
            ],
            [
              -110.70886253167016,
              23.796584233443014
            ],
            [
              -110.6987601261675,
              23.80368175517185
            ],
            [
              -110.69939152651168,
              23.80436947891667
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "TugOq2W5Rglu60fW2NbJEwCtUmXwMNYk",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.6987601261675,
              23.803599228077687
            ],
            [
              -110.70886253167016,
              23.796556722914673
            ],
            [
              -110.70823113132639,
              23.7959239791505
            ],
            [
              -110.69824899255578,
              23.802966518615293
            ],
            [
              -110.6987601261675,
              23.803599228077687
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "qPyZGMabiXFgV2O8OUu04GP4z2GfiXJO",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.69824899255578,
              23.802966518615293
            ],
            [
              -110.70820106464319,
              23.79589646848237
            ],
            [
              -110.70756966429943,
              23.79531874310196
            ],
            [
              -110.69758752552879,
              23.80241633396824
            ],
            [
              -110.69824899255578,
              23.802966518615293
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "8zOLACSh0VXJNGYh7ZUyWYFuDVpMyDFm",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.69758598971568,
              23.802248163062984
            ],
            [
              -110.7075782493851,
              23.795215390884238
            ],
            [
              -110.70702922412846,
              23.79471303544645
            ],
            [
              -110.69700036277554,
              23.80171234620019
            ],
            [
              -110.69758598971568,
              23.802248163062984
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "id": "i2nqc4TIyfF9iUbitoObn7C1cQNTM7oO",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.69707356614299,
              23.80164536893659
            ],
            [
              -110.70699262244497,
              23.79464605457528
            ],
            [
              -110.70596777529916,
              23.793674828055103
            ],
            [
              -110.69648793920287,
              23.801009083214026
            ],
            [
              -110.69707356614299,
              23.80164536893659
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
};

// Map each feature to have basic properties using its array index + 1
userFeatures.features.forEach((feature, index) => {
  const lotNumber = index + 1;
  feature.properties = {
    id: feature.id || `lote-${lotNumber}`,
    name: `Lote ${lotNumber}`,
    status: 'available',
    area: 'Por definir m²',
    price: 'Consultar',
    description: `Lote ${lotNumber} del proyecto DUNAH.`,
    groupId: 'dunah',
    zoneType: 'main-lot'
  };
});

const newContent = "import { LotFeatureCollection } from '@/components/maps/mapTypes';\n\nexport const lotsData: LotFeatureCollection = " + JSON.stringify(userFeatures, null, 2) + " as unknown as LotFeatureCollection;\n";

fs.writeFileSync(lotsFile, newContent);
console.log("Success! Updated 15 lots.");
