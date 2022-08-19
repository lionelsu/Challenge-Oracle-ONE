const result = document.querySelector('.result-text');

function encrypt() {
  const rawText = document.querySelector('.input-text').value
  const encryptedText = rawText.replace(/a/gi, 'ai').replace(/e/gi, 'enter').replace(/i/gi, 'imes').replace(/o/gi, 'ober').replace(/u/gi, 'ufat');
  return switchDisplay(), result.value = encryptedText;
}

function decrypt() {
  const encryptedText = document.querySelector('.input-text').value
  const rawText = encryptedText.replace(/ai/gi, 'a').replace(/enter/gi, 'e').replace(/imes/gi, 'i').replace(/ober/gi, 'o').replace(/ufat/gi, 'u');
  return switchDisplay(), result.value = rawText;
}

function copyButton() {
  const copyText = document.querySelector('.result-text');
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
}

function switchDisplay() {
  if(result.style.display = 'block') {
    const showHide = document.querySelector('.cipher-wrapper').style.display = 'none';
    const hideShow = document.querySelector('.input-cipher-wrapper').style.display = 'block';
    console.log('algumacoisa');
  }
}