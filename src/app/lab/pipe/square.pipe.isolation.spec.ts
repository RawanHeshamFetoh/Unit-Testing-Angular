import { SquarePipeForLab } from "./square.pipe"

describe("1-square pipe (class only) testing lab:",()=>{
  let pipeLab:SquarePipeForLab
    beforeEach(()=>{
      pipeLab=new SquarePipeForLab()
    })
    it("expect to return 16 when passing 4",()=>{
      expect(pipeLab.transform(4)).toBe(16)
    })
    it("expect to return 'Not a number' when passing wrong parameter",()=>{
      expect(pipeLab.transform("abc")).toBe("Not a number")
    })
})
