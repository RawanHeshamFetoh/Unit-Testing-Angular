import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageService } from "../../services/message/message.service";
import { MessagesComponentForLab } from "./messages.lab.component";
import { By } from "@angular/platform-browser";


describe("2-message component integration testing:", () => {

  let fixture: ComponentFixture<MessagesComponentForLab>,
    compoment: MessagesComponentForLab,
    messageService: MessageService;

  beforeEach(() => {

    TestBed.configureTestingModule({ imports: [MessagesComponentForLab], providers: [MessageService] })
    fixture = TestBed.createComponent(MessagesComponentForLab)
    compoment = fixture.componentInstance
    messageService = TestBed.inject(MessageService)
    fixture.detectChanges();
  })
  it("expect component template to be empty", () => {
    //Note: there is @if"messageService.messages.length" in line 1 in template
    let container = fixture.debugElement.query(By.css("#container"))
    expect(container).toBeNull();
  })
  it("then expect div.msg to have the messages after setting it", () => {
    messageService.add("msg 1")
    messageService.add("msg 2")
    messageService.add("msg 3")
    messageService.add("msg 4")
    fixture.detectChanges();
    const messages = fixture.debugElement.queryAll(By.css('.msg'))
    expect(messages.length).toBe(4)
    expect(messages[0].nativeElement.textContent).toContain('msg 1');
    expect(messages[1].nativeElement.textContent).toContain('msg 2');
    expect(messages[2].nativeElement.textContent).toContain('msg 3');
    expect(messages[3].nativeElement.textContent).toContain('msg 4');

  })
})

