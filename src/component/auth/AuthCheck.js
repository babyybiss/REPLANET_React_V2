const emailCheck = document.querySelector('#emailCheckButton');
const emailCheckResult = document.querySelector('#emailCheckResult');

let emailCheckPass = false;

const onCheckEmail = async () => {
  const email = document.querySelector('#email').value;
  const url = '/auth/emailcheck';
  const body = { email };

  const response = await axios.post(url, body);
  const data = response.data;
  if (data) {
    emailCheckResult.innerHTML = ' 사용가능한 아이디입니다.';
    emailCheckResult.style.color = 'green';
  } else {
    emailCheckResult.innerHTML = ' 중복된 아이디입니다.';
    emailCheckResult.style.color = 'red';
  }
  emailCheckPass = data;
};

emailCheck.addEventListener('click', onCheckEmail);

join.addEventListener('submit', (e) => {
  if (!emailCheckPass) {
    e.preventDefault();
    alert('아이디 중복체크 미완료');
  }
});