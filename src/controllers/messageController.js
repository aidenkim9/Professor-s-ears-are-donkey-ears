import Message from "../models/Message";

export const home = async (req, res) => {
  const messages = await Message.find({});
  return res.render("home", { pageTitle: "Home", messages });
};
export const getWrite = (req, res) =>
  res.render("message", { pageTitle: "Message" });
export const postWrite = async (req, res) => {
  const { stu_id, pro_id, title, message } = req.body;
  try {
    await Message.create({
      stu_id,
      pro_id,
      title,
      openDate: Date.now() + 2592000000,
      message,
    });
    return res.redirect("/");
  } catch {
    console.log("Message send error");
    return res.render("message", { pageTitle: "Message" });
  }
};

export const view = async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (Number(message.openDate) > Date.now()) {
    console.log("Check open date");
    return res.redirect("/");
  }
  return res.render("view", { message, pageTitle: message.title });
};
export const edit = (req, res) => res.render("edit");

//메세지 작성 파트: 학생 학번, 교수 번호, 날짜, 메세지, 비속어 필터
//로그인 파트: 가상의 데이터 베이스 생성, 입력한 이메일, 비밀번호와 데이터 베이스 비교 후 같으면 홈 화면으로 리디렉션
//홈 파트: 데이터 베이스에 저장된 메세지 모두 띄우기
//메세지 열람: 조건문을 통해 현재 날짜와 메세지 작성 시 입력된 날짜 간의 차이 비교. 30일 이상 차이나면 열람 가능, 그 이하일 경우 경고문 등장 및 홈으로 리디렉션
