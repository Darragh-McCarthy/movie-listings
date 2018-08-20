import { TestBed, inject } from "@angular/core/testing";

import { TheMovieDatabaseService } from "./the-movie-database.service";

describe("TheMovieDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TheMovieDatabaseService]
    });
  });

  it("should be created", inject(
    [TheMovieDatabaseService],
    (service: TheMovieDatabaseService) => {
      expect(service).toBeTruthy();
    }
  ));
});
