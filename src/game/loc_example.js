import { Loc } from "./../mlpa_engine";
import { PARAM_EQUILIBRIUM, PARAM_DETERMINATION } from "./parameters";
import { RANGE_HYSTERICS, RANGE_TRANQUILITY } from "./ranges";
import { GRAD_CONSTRUCTIVE } from "./grads";

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
  locE.cGrad(GRAD_CONSTRUCTIVE, RANGE_HYSTERICS, RANGE_TRANQUILITY)
);

locE.cTopic(
  "adecvat",
  GRAD_CONSTRUCTIVE,
  locE.cStage(
    locE.cStuff(
      null,
      locE.cPhrase("im have hysterics", RANGE_HYSTERICS),
      locE.cPhrase("im ok")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("fix it!!!", RANGE_HYSTERICS),
      locE.cPhrase("be cool bro")
    ),
    locE.cStuff(
      { id: 2, changes: [locE.cChange(PARAM_DETERMINATION, -5)] },
      locE.cPhrase("im good!!!", RANGE_TRANQUILITY),
      locE.cPhrase("im normal")
    )
  )
);

export default locE;
