const randElem = arr => arr[Math.floor(Math.random() * arr.length)];

const Markov = function(data, doLog){
  data = data.toString();
  this.text = data;
  let arr = data.split(/[\.\!\?] |\n/g);
  this.arr = arr;
  let words = {};
  this.words = words;

  let log;
  if(doLog){
    log = console.log;
  }else{
    log = () => {};
  }

  arr.forEach(sentence => {
  	(sentence.match(/[a-z0-9'\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]+/iug)
    || []).map(x=>x.toLowerCase()).forEach((word, idx, arr) => {
  		words[word] = words[word] || {};
  		let elem = words[word];
  		elem.freq = elem.freq || 0;
  		elem.freq ++;
  		if(arr[idx + 1]){
        log(word, "+1", arr[idx + 1]);
        if(arr[idx + 1] === word) return;
  			let word2 = arr[idx + 1];
  			elem.nextWords = elem.nextWords || {};
  			elem.nextWords[word2] = elem.nextWords[word2] || {};
  			elem.nextWords[word2].freq = elem.nextWords[word2].freq || 0;
  			elem.nextWords[word2].freq ++;
  		}else{
        elem.termCount = elem.termCount || 0;
        elem.termCount ++;
        log(elem);
      }
  	});
  });

  this.predictNextWord = function(word){
  	if(words[word] && words[word].nextWords){
  		let next = words[word].nextWords;
  		let highest = 0;
  		let best = [];
  		Object.keys(next).forEach(word=>{
  			if(next[word].freq > highest){
  				highest = next[word].freq;
          let modifiedWord = word;
  				best = [word];
  			}else{
  				best.push(word);
  			}
  		});
      best = best.map(word => {
        log("compare", JSON.stringify(words[word]), words[word].termCount, highest);
        if(words[word].termCount > 0 && words[word].termCount > highest - (Math.random() * 3.5)){
          log("termCount is high");
          // throw 0;
          return word + randElem([". ", ". ", ". ", ". ", ". ", ". ", ". ", "! ", "! ", "? ", "? ", "!! ", "?? "]);
        }else{
          return word;
        }
      });
  		let rand = randElem(Object.keys(next));
  		log("best is", best, "rand", rand);
  		return randElem(best)
          || rand;
  	}
  	log("random");
  	return randElem(Object.keys(words));
  };

  this.makeSentence = function(length){
  	let sentence = "";
  	let last;
  	for(var i = 0; i < length; i ++){
  		last = this.predictNextWord(last);
  		sentence += last + " ";
  	}
  	return sentence.trim();
  };
};


module.exports = Markov;
