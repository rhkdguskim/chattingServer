import { NullCheck } from "./util"

describe("util Check", () => {
      describe('isNull', () => {
        it('should be Null', async () => {
            expect(NullCheck(null)).toEqual(true);
        });

        it('should be Null', async () => {
          expect(NullCheck(1)).toEqual(false);
        });

      it('should be Null', async () => {
        expect(NullCheck("Null")).toEqual(false);
        });

        it('should be Null', async () => {
          expect(NullCheck([])).toEqual(false);
          });
      });
  });
