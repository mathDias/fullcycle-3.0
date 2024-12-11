
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumerCreatedSecondLogEvent from "../costumer-created-second-log.event";

export default class SendConsole2WhenCostumerIsCreatedHandler
  implements EventHandlerInterface<CostumerCreatedSecondLogEvent>
{
  handle(event: CostumerCreatedSecondLogEvent): void {
    console.log(`Esse é o segundo  console.log do evento: CustomerCreated`); 
  }
}