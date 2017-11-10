const Marakov = require("./index.js");

if(!process.argv[2]){
  console.error("You need to specify a file to read in the second argument.");
  process.exitCode = 1;
}else{
  let data;
  try{
    data = require("fs").readFileSync(process.argv[2]);
  }catch(e){
    console.error(e.code, "Could not read file", process.argv[2]);
    process.exit(1);
  }

  const text = new Marakov(data);

  console.log(text.makeSentence(parseInt(process.argv[3]) || 10));
}
