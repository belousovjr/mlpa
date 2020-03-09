import { Loc } from "./../mlpa_engine";
import { PARAM_EQUILIBRIUM, PARAM_DETERMINATION } from "./parameters";
import { RANGE_HYSTERICS, RANGE_TRANQUILITY } from "./ranges";
import { GRAD_CONSTRUCTIVE, GRAD_IMPOTENCE } from "./grads";

const locE = new Loc();
locE.addParams(
  locE.cParam(PARAM_DETERMINATION, 2),
  locE.cParam(PARAM_EQUILIBRIUM, 4)
);

locE.addRanges(
  locE.cRange(RANGE_HYSTERICS, 0, 3, PARAM_EQUILIBRIUM),
  locE.cRange(RANGE_TRANQUILITY, 0, 3, PARAM_DETERMINATION)
);
locE.addGrads(
  locE.cGrad(GRAD_CONSTRUCTIVE, RANGE_HYSTERICS, RANGE_TRANQUILITY),
  locE.cGrad(GRAD_IMPOTENCE, RANGE_HYSTERICS, RANGE_TRANQUILITY)
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
