import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CostumerAddressChangeLogEvent from "./costumer-address-change-log.event";
import CostumerCreatedSecondLogEvent from "./costumer-created-second-log.event";
import CostumerCreatedEvent from "./costumer-created.event";
import SendConsole1WhenCostumerIsCreatedHandler from "./handler/send-console-1-when-costumer-is-created.handler";
import SendConsole2WhenCostumerIsCreatedHandler from "./handler/send-console-2-when-costumer-is-created.handler";
import SendConsoleWhenAdrressChangeHandler from "./handler/send-console-when-address-changed-event";

describe("Costumer events tests", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandlerCostumerCreated1: SendConsole1WhenCostumerIsCreatedHandler;
  let eventHandlerCostumerCreated2: SendConsole2WhenCostumerIsCreatedHandler;
  let eventHandlerAddressChanged: SendConsoleWhenAdrressChangeHandler;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    eventHandlerCostumerCreated1 = new SendConsole1WhenCostumerIsCreatedHandler();
    eventHandlerCostumerCreated2 = new SendConsole2WhenCostumerIsCreatedHandler();
    eventHandlerAddressChanged = new SendConsoleWhenAdrressChangeHandler();

    eventDispatcher.register("CostumerCreatedEvent", eventHandlerCostumerCreated1);
    eventDispatcher.register("CostumerCreatedSecondLogEvent", eventHandlerCostumerCreated2);
    eventDispatcher.register("CostumerAddressChangeLogEvent", eventHandlerAddressChanged);
  });

  it("should register costumer event handlers", () => {
    expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CostumerCreatedSecondLogEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CostumerAddressChangeLogEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CostumerCreatedSecondLogEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CostumerAddressChangeLogEvent"].length).toBe(1);

    expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(
      eventHandlerCostumerCreated1
    );
    expect(eventDispatcher.getEventHandlers["CostumerCreatedSecondLogEvent"][0]).toMatchObject(
      eventHandlerCostumerCreated2
    );
    expect(eventDispatcher.getEventHandlers["CostumerAddressChangeLogEvent"][0]).toMatchObject(
      eventHandlerAddressChanged
    );
  });

  it("should unregister an event handler", () => {
    eventDispatcher.unregister("CostumerCreatedEvent", eventHandlerCostumerCreated1);
    eventDispatcher.unregister("CostumerCreatedSecondLogEvent", eventHandlerCostumerCreated2);
    eventDispatcher.unregister("CostumerAddressChangeLogEvent", eventHandlerAddressChanged);

    expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(0);
    expect(eventDispatcher.getEventHandlers["CostumerCreatedSecondLogEvent"].length).toBe(0);
    expect(eventDispatcher.getEventHandlers["CostumerAddressChangeLogEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CostumerCreatedSecondLogEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CostumerAddressChangeLogEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const spyEventHandler1 = jest.spyOn(eventHandlerCostumerCreated1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandlerCostumerCreated2, "handle");
    const spyEventHandler3 = jest.spyOn(eventHandlerAddressChanged, "handle");

    const customer = new Customer("c1", "Customer 1");
    const customerCreatedEvent = new CostumerCreatedEvent(null);
    const customerCreatedEvent2 = new CostumerCreatedSecondLogEvent(null);
    const address = new Address("street x", 333, "0422200", "city");
    customer.changeAddress(address);

    const customerAddressChangedEvent = new CostumerAddressChangeLogEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent2);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
