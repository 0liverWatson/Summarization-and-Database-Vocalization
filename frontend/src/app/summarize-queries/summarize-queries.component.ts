import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import spoken from "../../assets/spoken.js";

@Component({
  selector: 'app-summarize-queries',
  templateUrl: './summarize-queries.component.html',
  styleUrls: ['./summarize-queries.component.css']
})
export class SummarizeQueriesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  tables: string[];
  listeningText: string;

  ngOnInit(): void {
    this.getTableData();

    this.tables = ['Table1', 'Table2', 'Table3', 'Table4'];

    spoken.say('Hello, Ask Something').then(speech => {
      spoken.listen().then(transcript => {
        console.log("Answer: " + transcript);
        this.listeningText = transcript;
      })
    });

    var createNewString = function (oldStringObj, string) {
      var _new = new String(string);

      var keys = Object.keys(oldStringObj);  // returns only custom properties (not part of prototype)
      for (var i = 0, n = keys.length; i < n; i++) {
        var key = keys[i];

        if (Number.isInteger(+key)) {
          continue;                         // skip property if it's a numbered key
        }
        _new[key] = oldStringObj[key];       // simple assignment (not a deep copy) -- room for improvement
      }
      return _new;
    };

    // Setup Listener Events
    spoken.listen.on.partial(transcript => {
      transcript = transcript.toLowerCase(); if (transcript.includes("laura") || transcript.includes("elora") || transcript.includes("alora") || transcript.includes("ellora") || transcript.includes("allure")) {
        var arr = transcript.split('laura').join(',').split('elora').join(',').split('ellora').join(',').split('alora').join(',').split('allure').join(',').split(',')
        transcript = createNewString(transcript, arr[arr.length - 1]);
        console.log("Captured Transcript: " + transcript);
      } //Here we could send to the chatbot...
    });

    spoken.listen.on.end(this.continueCapture);
    spoken.listen.on.error(this.continueCapture);

  }

  startCapture() {
    spoken.listen({ continuous: true }).then(transcript =>
      console.log('Started Listening')
    ).catch(e => true);
  }

  async continueCapture() {
    await spoken.delay(1);
    spoken.listen.stop();
    console.log('Stopped Listening');
    if (spoken.recognition.continuous) this.startCapture();
  }

  stopCapture() {
    spoken.recognition.continuous = false;
    spoken.listen.stop();
  }

  getTableData() {
    this.http.get('assets/tables.json').subscribe(data => {
      this.tables = data['tables'];
    });
  }

}
