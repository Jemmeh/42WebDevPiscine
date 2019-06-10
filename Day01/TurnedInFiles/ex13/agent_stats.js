if (process.argv.length > 2){ // 1 is node, 2 is agent_stats.js. (argv.length is 1-indexed)
  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  var linecounter = 0;

  // AVERAGE: Average Grade of All Users
  // usage: cat ../../resources/peer_notes_1.csv | node agent_stats.js average
  if (process.argv[2] == "average" || process.argv[2] == "moyenne"){
    var numberOfGrades = 0;
    var averageTotal = 0;

    rl.on('line', function (line) {
        linecounter++; 
        if (linecounter > 1){ // skip the column headers.
          var temp;
          temp = line.split(";"); // temp[0] = user | temp[1] = note/grade | temp[2] = Grader | temp[3] = Feedback
          if (temp[2] != "moulinette" && temp[1] !== ''){
            averageTotal += parseInt(temp[1]);
            numberOfGrades++;
          }
        }
    }).on('close', function(){
      console.log((averageTotal / numberOfGrades).toFixed(13));
      })
  }else{ //We need the whole file for the other 2.
    var fileArray = [];

    rl.on('line', function (line) {
      linecounter++; 
      if (linecounter > 1){ // skip the column headers.
        fileArray.push(line);
      }
    }).on('close', function(){
        fileArray.sort()
        //console.dir(fileArray, {'maxArrayLength': null}); // For testing only. Print the whole array.
      // AVERAGE_USER: Calculate the average grade per user ordered by alphabetical order.
      if(process.argv[2] == "average_user" || process.argv[2] == "moyenne_user"){ 
        var users = [];
        fileArray.forEach(function(element){
          temp = element.split(";"); // temp[0] = user | temp[1] = note/grade | temp[2] = Grader | temp[3] = Feedback
          
        })
      // MOULINETTE_VARIANCE: calculate the average grade per user of the di erence between a grade received by your peer and by Moulinette. (alphabetical)
      } else if(process.argv[2] == "moulinette_variance" || process.argv[2] == "ecart_moulinette"){

    }});
  }
}