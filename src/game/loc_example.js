import { Loc } from "./../mlpa_engine";

import { PARAM_EQUILIBRIUM, PARAM_DETERMINATION } from "./parameters";

import { RANGE_PANIC, RANGE_TENSION, RANGE_STABILITY, 
  RANGE_APATHY, RANGE_UNCERTAINTY, RANGE_CONFIDENCE } from "./ranges";

import { GRAD_PAN_APA, GRAD_PAN_UNC, GRAD_PAN_CON,
 GRAD_TEN_APA, GRAD_TEN_UNC, GRAD_TEN_CON,
  GRAD_STAB_APA, GRAD_STAB_UNC, GRAD_STAB_CON } from "./grads";

const locE = new Loc();
locE.addParams(
  locE.cParam(PARAM_DETERMINATION, 2),
  locE.cParam(PARAM_EQUILIBRIUM, 4)
);

locE.addRanges(
    locE.cRange(RANGE_PANIC, 1, 5, PARAM_EQUILIBRIUM),
    locE.cRange(RANGE_TENSION, 6, 10, PARAM_EQUILIBRIUM),
    locE.cRange(RANGE_STABILITY, 11, 15, PARAM_EQUILIBRIUM),

    locE.cRange(RANGE_APATHY, 1, 5, PARAM_DETERMINATION),
    locE.cRange(RANGE_UNCERTAINTY, 6, 10, PARAM_DETERMINATION),
    locE.cRange(RANGE_CONFIDENCE, 11, 15, PARAM_DETERMINATION)
);
locE.addGrads(
  locE.cGrad(GRAD_PAN_APA, RANGE_PANIC, RANGE_APATHY),
  locE.cGrad(GRAD_PAN_UNC, RANGE_PANIC, RANGE_UNCERTAINTY),
  locE.cGrad(GRAD_PAN_CON, RANGE_PANIC, RANGE_CONFIDENCE),

  locE.cGrad(GRAD_TEN_APA, RANGE_TENSION, RANGE_APATHY),
  locE.cGrad(GRAD_TEN_UNC, RANGE_TENSION, RANGE_UNCERTAINTY),
  locE.cGrad(GRAD_TEN_CON, RANGE_TENSION, RANGE_CONFIDENCE),

  locE.cGrad(GRAD_STAB_APA, RANGE_STABILITY, RANGE_APATHY),
  locE.cGrad(GRAD_STAB_UNC, RANGE_STABILITY, RANGE_UNCERTAINTY),
  locE.cGrad(GRAD_STAB_CON, RANGE_STABILITY, RANGE_CONFIDENCE),
);

/*locE.cTopic(
  "терки за семью",
  GRAD_CONSTRUCTIVE,
  locE.cStage(
    locE.cStuff(
      { isA: true },
      locE.cPhrase("Ты меня совсем не понимаешь!", RANGE_HYSTERICS),
      locE.cPhrase(
        "Да я в своем сознании настолько преисполнилась, иди суетись...",
        RANGE_TRANQUILITY
      ),
      locE.cPhrase("Ты кажется не понял.")
    ),
    locE.cStuff(
      { id: 4, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Успокойся истеричка ебать!", RANGE_HYSTERICS),
      locE.cPhrase("Да все норм ты шо.")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_EQUILIBRIUM, 5)] },
      locE.cPhrase("Ебать ты филосОф! Деду нравится.", RANGE_TRANQUILITY),
      locE.cPhrase("Эй ну извини ты шо.")
    )
  ),
  locE.cStage(
    locE.cStuff(
      { isA: true },
      locE.cPhrase("В смысле ты мой отец?!", RANGE_HYSTERICS),
      locE.cPhrase("Ты мой батя?..")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Дорогуша остынь.", RANGE_HYSTERICS),
      locE.cPhrase("Да, батя. Только не волнуйся.")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Хех, ну в некотором смысле я пошутил", RANGE_HYSTERICS),
      locE.cPhrase("Ну, тест ДНК я не делал...")
    )
  )
);



locE.cTopic(
  "убийства!",
  GRAD_CONSTRUCTIVE,
  locE.cStage(
    locE.cStuff(
      { isA: true },
      locE.cPhrase("Ты меня совсем не понимаешь!", RANGE_HYSTERICS),
      locE.cPhrase(
        "Да я в своем сознании настолько преисполнилась, иди суетись...",
        RANGE_TRANQUILITY
      ),
      locE.cPhrase("Ты кажется не понял.")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Успокойся истеричка ебать!", RANGE_HYSTERICS),
      locE.cPhrase("Да все норм ты шо.")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_EQUILIBRIUM, 5)] },
      locE.cPhrase("Ебать ты филосОф! Деду нравится.", RANGE_TRANQUILITY),
      locE.cPhrase("Эй ну извини ты шо.")
    )
  ),
  locE.cStage(
    locE.cStuff(
      { isA: true },
      locE.cPhrase("В смысле ты мой отец?!", RANGE_HYSTERICS),
      locE.cPhrase("Ты мой батя?..")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Дорогуша остынь.", RANGE_HYSTERICS),
      locE.cPhrase("Да, батя. Только не волнуйся.")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("Хех, ну в некотором смысле я пошутил", RANGE_HYSTERICS),
      locE.cPhrase("Ну, тест ДНК я не делал...")
    )
  )
);*/

export default locE;
