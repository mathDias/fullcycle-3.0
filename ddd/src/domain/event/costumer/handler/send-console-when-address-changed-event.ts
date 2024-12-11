
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumerAddressChangeLogEvent from "../costumer-address-change-log.event";

export default class SendConsoleWhenAdrressChangeHandler
  implements EventHandlerInterface<CostumerAddressChangeLogEvent>
{
  handle(event: CostumerAddressChangeLogEvent): void {
    const { id, name, Address } = event.eventData;
    const { street, number, zip, city } = Address;

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${zip}, ${city}`
    );
  }
}