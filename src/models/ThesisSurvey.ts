import {Model} from "@/core";
import GeneralSurvey from "./GeneralSurvey";
import {LikertScaleQuestion, MinMaxQuestion, MultiResponseLikertScaleQuestion} from "@/models/common";
import {OVERCONFIDENCE_QUESTIONS, TEAM_COORDINATION_QUESTIONS,TEAM_EFFECTIVENESS_QUESTIONS} from "@/constants";
import arrayShuffle from "array-shuffle";


export default class ThesisSurvey extends Model {
    /**
     *
     */
    constructor() {
        super();
        this.generalSurvey = {
            age: NaN,
            sex: undefined,
            teamHistory: NaN,
            tenure: NaN,
        };

        this.voiceSurvey = [];
        this.overconfidenceSurvey = arrayShuffle(Object.entries(OVERCONFIDENCE_QUESTIONS).map(([key, value]) => new MinMaxQuestion(value.index, value.text)));
        this.teamCoordinationSurvey = arrayShuffle(Object.entries(TEAM_COORDINATION_QUESTIONS).map(([key, value])=> new LikertScaleQuestion(value.index,value.text)));
        this.teamEffectivenessSurvey = arrayShuffle(Object.entries(TEAM_EFFECTIVENESS_QUESTIONS).map(([key, value])=> new LikertScaleQuestion(value.index,value.text,7)));
        this.feedback = "";
    }

    generalSurvey!: GeneralSurvey;
    voiceSurvey!: Array<MultiResponseLikertScaleQuestion>;
    overconfidenceSurvey!: Array<MinMaxQuestion>;
    teamCoordinationSurvey!: Array<LikertScaleQuestion>;
    teamEffectivenessSurvey!: Array<LikertScaleQuestion>;
    feedback!: string;
}
