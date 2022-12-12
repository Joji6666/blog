import "./App.css";
import { useState } from "react";
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";

function App() {
  let [글제목, 셋글제목] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);
  let [따봉, 셋따봉] = useState([0, 0, 0]);
  let [modal, setMoadl] = useState(false);
  let [title, setTitle] = useState(0);
  let [value, setValue] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그임</h4>
      </div>
      <div className="sexChange">
        <button
          onClick={() => {
            let 제목변경 = [...글제목];

            제목변경[0] = "여자 코트 추천";

            셋글제목(제목변경);
          }}
        >
          성별전환
        </button>
        <button
          onClick={() => {
            let 정렬글제목 = [...글제목];
            정렬글제목.sort();
            셋글제목(정렬글제목);
          }}
        >
          가나다순 정렬
        </button>
      </div>

      {글제목.map(function (a, i) {
        return (
          <div className="list">
            <h4
              onClick={() => {
                setMoadl(!modal);
                setTitle(i);
              }}
            >
              {글제목[i]}
              <span
                onClick={(e) => {
                  let 개별따봉 = [...따봉];
                  개별따봉[i] = 개별따봉[i] + 1;
                  e.stopPropagation(); // 상위 html 이벤트 버블링을 막는 법
                  셋따봉(개별따봉);
                }}
              >
                👍{따봉[i]}
              </span>
            </h4>

            <p>2월 17일 발행</p>
            <button
              onClick={() => {
                let 글삭제 = [...글제목];
                글삭제.splice(i, 1);

                셋글제목(글삭제);
              }}
            >
              글 삭제
            </button>
          </div>
        );
      })}

      {modal == true ? (
        <Modal title={title} 셋글제목={셋글제목} 글제목={글제목} />
      ) : null}
      <div>
        <input
          rules={[{ required: true, message: "상품 정보를 입력해주세요." }]}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <button
          onClick={() => {
            let copyValue = [...글제목];
            copyValue.unshift(value);
            셋글제목(copyValue);
          }}
        >
          글발행
        </button>
      </div>
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
};

export default App;
