import IDto from "../contracts/IDto";
import Model from "../models/Model";
import {IQuestionable} from "@/core/models/IQuestionable";

export default interface IDtoFromModelMapper {
  createDtoFromModel(_model: Model | Array<IQuestionable>): IDto;
}
