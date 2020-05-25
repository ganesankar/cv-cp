import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faHome
} from "@fortawesome/free-solid-svg-icons";

class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="content-center">
          <Container>
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  Some thing Went Wrong <br />
                  <span className="text-white">404</span>
                </h1>
                <p className="text-white mb-3">
                  I feel terrible that you might reached the place where you
                  dont belong to or may be I could not find the people[s] or the
                  thing[s] you are looing for
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Feel free to go back to home page and continue
                  </p>
                  <Link
                    to="/"
                    className="btn btn-link"
                    size="sm"
                    color="success"
                  >
                    Home <i className="tim-icons icon-minimal-right" />
                  </Link>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Link
                      to="/"
                      className="btn btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                    >
                      <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <Link
                      to="/students"
                      className="btn  btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                    >
                      <FontAwesomeIcon icon={faUserGraduate} />
                    </Link>

                    <Link
                      to="/taffs"
                      className="btn btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                    >
                      <FontAwesomeIcon icon={faChalkboardTeacher} />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg="2" md="3">
                <img
                  alt="sad"
                  src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtNTEyIDI1NmMwIDgxLjM1OC0zNy45NTMgMTUzLjg1My05Ny4xMTkgMjAwLjc0NC00My42NTMgMzQuNTk2LTI3NC4yMDQgMzQuNTYxLTMxNy44NzUtLjA5LTU5LjEwMi00Ni44OTQtOTcuMDA2LTExOS4zNDctOTcuMDA2LTIwMC42NTQgMC0xNDEuMzg1IDExNC42MTUtMjU2IDI1Ni0yNTZzMjU2IDExNC42MTUgMjU2IDI1NnoiIGZpbGw9IiMyMzliYzAiLz48cGF0aCBkPSJtMjU2IDUxMmM2MC4wOTIgMCAxMTUuMzQxLTIwLjcxNCAxNTkuMDE3LTU1LjM3OS0yNy44MjItMjEuMTc5LTYyLjQxOC0zNi44NTQtMTAwLjk3NC00NC44LTQuNjctLjk2Mi04LjA0My01LjAzNi04LjA0My05LjgwM3YtOTcuNzQ4aC0xMDB2OTcuNzQ4YzAgNC43NjgtMy4zNzMgOC44NDEtOC4wNDMgOS44MDMtMzguNTU2IDcuOTQ2LTczLjE1MSAyMy42MjEtMTAwLjk3NCA0NC44IDQzLjY3NiAzNC42NjUgOTguOTI1IDU1LjM3OSAxNTkuMDE3IDU1LjM3OXoiIGZpbGw9IiNmYmJkOTQiLz48cGF0aCBkPSJtMzA3LjExMSA0MDYuNTdjLS43MDgtMS4zNzMtMS4xMTEtMi45Mi0xLjExMS00LjU1M3YtOTcuNzQ3aC0xMDB2OTcuNzQ4YzAgNC43NjgtMy4zNzMgOC44NDEtOC4wNDMgOS44MDMtMzguNTU2IDcuOTQ2LTczLjE1MSAyMy42MjEtMTAwLjk3NCA0NC44IDEyLjc4IDEwLjE0MyAyNi41NTcgMTkuMDgxIDQxLjE1IDI2LjY2NiAzOC4wMi00Mi45MjQgOTkuMDUxLTcyLjIxMiAxNjguOTc4LTc2LjcxN3oiIGZpbGw9IiNmYmFkN2QiLz48cGF0aCBkPSJtMzExLjczNCA0MTEuMDQyYy03LjM2IDIzLjc4OC0yOS41MjggNDEuMDctNTUuNzM0IDQxLjA3cy00OC4zNzQtMTcuMjgyLTU1LjczNC00MS4wN2MtLjcyNC4zNDQtMS40OTUuNjExLTIuMzA5Ljc3OS0zOC41NTYgNy45NDYtNzMuMTUxIDIzLjYyMS0xMDAuOTc0IDQ0LjggNDMuNjc2IDM0LjY2NSA5OC45MjUgNTUuMzc5IDE1OS4wMTcgNTUuMzc5czExNS4zNDEtMjAuNzE0IDE1OS4wMTctNTUuMzc5Yy0yNy44MjItMjEuMTc5LTYyLjQxOC0zNi44NTQtMTAwLjk3NC00NC44LS44MTQtLjE2OC0xLjU4NS0uNDM1LTIuMzA5LS43Nzl6IiBmaWxsPSIjZjFmNGRmIi8+PHBhdGggZD0ibTEwMS41MjggNDYwLjE0Yy40MzYuMzMuODc4LjY1MyAxLjMxNS45OCAxLjExOC44MzYgMi4yNDEgMS42NjcgMy4zNzMgMi40ODUuNDc3LjM0NS45NTguNjg1IDEuNDM4IDEuMDI2IDEuMTQ0LjgxNCAyLjI5MyAxLjYyMSAzLjQ1MSAyLjQxNy40MjYuMjkzLjg1Mi41ODQgMS4yOC44NzUgMS4zMDQuODg1IDIuNjE3IDEuNzU5IDMuOTM5IDIuNjIxLjI3Ny4xODEuNTUzLjM2NC44MzEuNTQzIDYuNzggNC4zODMgMTMuNzc5IDguNDU3IDIwLjk3OCAxMi4xOTkgMTkuMDE4LTIxLjQ3MSA0My43OTMtMzkuNTMgNzIuNTYtNTIuNzgxLTQuNjI1LTUuNjk5LTguMjA1LTEyLjI4MS0xMC40MjctMTkuNDYzLS4zMjkuMTU2LS42Ny4yOTMtMS4wMTkuNDE0LS4wNjIuMDIyLS4xMjQuMDQ0LS4xODYuMDY0LS4zNi4xMTctLjcyNi4yMjMtMS4xMDQuMzAxLTIxLjY4OCA0LjQ3LTQyLjEyMiAxMS4zODUtNjAuODAzIDIwLjM1LTYuMjI3IDIuOTg4LTEyLjI1OSA2LjIwNC0xOC4wNzggOS42MzMtNy43NTggNC41NzItMTUuMTM3IDkuNTIzLTIyLjA5MyAxNC44MTcgMS41MDEgMS4xOTEgMy4wMTcgMi4zNjIgNC41NDUgMy41MTl6IiBmaWxsPSIjZGNlNWUwIi8+PHBhdGggZD0ibTg1Ljk4NCAxOTkuMDhjMjMuMzI2LTYuMjUgNjQuOTM2IDIuODY4IDcxLjE4NiAyNi4xOTRzLTI1LjIyNiA1Mi4wMjctNDguNTUyIDU4LjI3OGMtMjMuMzI2IDYuMjUtMjkuNjY4LTEyLjMxOC0zNS45MTktMzUuNjQ0LTYuMjUtMjMuMzI3LTEwLjA0MS00Mi41NzggMTMuMjg1LTQ4LjgyOHoiIGZpbGw9IiNmYmFkN2QiLz48cGF0aCBkPSJtNDI2LjAxNiAxOTkuMDhjLTIzLjMyNi02LjI1LTY0LjkzNiAyLjg2OC03MS4xODYgMjYuMTk0czI1LjIyNiA1Mi4wMjcgNDguNTUyIDU4LjI3OGMyMy4zMjYgNi4yNSAyOS42NjgtMTIuMzE4IDM1LjkxOS0zNS42NDQgNi4yNS0yMy4zMjcgMTAuMDQxLTQyLjU3OC0xMy4yODUtNDguODI4eiIgZmlsbD0iI2ZiYmQ5NCIvPjxwYXRoIGQ9Im00MTIuMjggMjA1LjI1YzAgMi45Ni0uMDMgNS45MS0uMDkgOC44Ny0xLjYgODMuMzUtMjcuMzIgMTY1LjE1LTE1Ni4xOSAxNjUuMTUtMTA3LjAyIDAtMTQyLjktNTYuNDEtMTUyLjkxLTEyMy4yNy0yLjQ3LTE2LjUxLTMuMzctMzMuNjYtMy4zNy01MC43NSAwLTg2LjMxIDY5Ljk3LTE1Ni4yOCAxNTYuMjgtMTU2LjI4czE1Ni4yOCA2OS45NyAxNTYuMjggMTU2LjI4eiIgZmlsbD0iI2ZjZDJhYyIvPjxnIGZpbGw9IiNmYmJkOTQiPjxwYXRoIGQ9Im0xMzkuNzE5IDIwNS4yNTR2LTEwNC40MDVjLTI0Ljg2NSAyNy42NzYtNDAgNjQuMjcxLTQwIDEwNC40MDUgMCA4Ni4zMTIgMjIuODM4IDE3NC4wMTYgMTU2LjI4MSAxNzQuMDE2IDEuODggMCAzLjczLS4wMjMgNS41NjYtLjA1OCAxLS4wMiAxLjk4NS0uMDUxIDIuOTczLS4wODEuNzM4LS4wMjIgMS40NzctLjA0MyAyLjIwOC0uMDcgMS4zMTMtLjA1IDIuNjE0LS4xMSAzLjkwNC0uMTc4LjMxLS4wMTYuNjE4LS4wMzMuOTI3LS4wNSAxLjQ4Ny0uMDg0IDIuOTYzLS4xNzYgNC40MjEtLjI4MmguMDAxYy0xMTUuNzUtOC40NTMtMTM2LjI4MS05MS40OTMtMTM2LjI4MS0xNzMuMjk3eiIvPjxwYXRoIGQ9Im0zMDUuMzMgMzMzLjEwOWMtMi45NjkgMC01Ljc3OS0xLjc3My02Ljk1OC00LjY5NS03LjAyMy0xNy40MDUtMjMuNjU1LTI4LjY1MS00Mi4zNzItMjguNjUxcy0zNS4zNDkgMTEuMjQ2LTQyLjM3MiAyOC42NTFjLTEuNTUgMy44MzktNS45MTggNS43LTkuNzYyIDQuMTQ4LTMuODQxLTEuNTUtNS42OTgtNS45Mi00LjE0OC05Ljc2MiA5LjMyNS0yMy4xMDcgMzEuNDE3LTM4LjAzOCA1Ni4yODItMzguMDM4czQ2Ljk1NyAxNC45MzEgNTYuMjgyIDM4LjAzOGMxLjU1IDMuODQxLS4zMDggOC4yMTEtNC4xNDggOS43NjItLjkyLjM3MS0xLjg3LjU0Ny0yLjgwNC41NDd6Ii8+PHBhdGggZD0ibTI1NiAyNzYuMDY3Yy04LjQ1IDAtMTUuNDYxLTYuNTM0LTE2LjA1Ni0xNC45NjNsLTguMTg4LTExNS45NTljLS40MDktNS43ODYgNC4xNzUtMTAuNzA0IDkuOTc1LTEwLjcwNGgyOC41MzhjNS44IDAgMTAuMzg0IDQuOTE5IDkuOTc1IDEwLjcwNGwtOC4xODggMTE1Ljk1OWMtLjU5NSA4LjQzLTcuNjA2IDE0Ljk2My0xNi4wNTYgMTQuOTYzeiIvPjwvZz48cGF0aCBkPSJtMzA1LjM3NiAyMjYuNDMyYy0uMDc2IDYuMjUzIDIuNDU0IDEyLjUzMyA3LjU5IDE3LjA2OSA4LjM2NSA3LjM4NyAyMS4xODYgNy4zODcgMjkuNTUxIDAgNS4xMzYtNC41MzYgNy42NjctMTAuODE1IDcuNTktMTcuMDY5LS4wOTktOC4xMjEtMTAuMDczLTEyLjAxOC0xNS44MTUtNi4yNzYtMy42MTggMy42MTgtOS40ODMgMy42MTgtMTMuMTAxIDAtNS43NDItNS43NDItMTUuNzE2LTEuODQ0LTE1LjgxNSA2LjI3NnoiIGZpbGw9IiMzNzE0M2YiLz48cGF0aCBkPSJtMjA2LjYyNCAyMjYuNDMyYy4wNzYgNi4yNTMtMi40NTQgMTIuNTMzLTcuNTkgMTcuMDY5LTguMzY1IDcuMzg3LTIxLjE4NiA3LjM4Ny0yOS41NTEgMC01LjEzNi00LjUzNi03LjY2Ny0xMC44MTUtNy41OS0xNy4wNjkuMDk5LTguMTIxIDEwLjA3Mi0xMi4wMTggMTUuODE1LTYuMjc2IDMuNjE4IDMuNjE4IDkuNDgzIDMuNjE4IDEzLjEwMSAwIDUuNzQyLTUuNzQyIDE1LjcxNi0xLjg0NCAxNS44MTUgNi4yNzZ6IiBmaWxsPSIjMzcxNDNmIi8+PHBhdGggZD0ibTQ0MC4xNjQgMTYzLjI1NGMtMjIuNjMxLTc3LjM4OS05Ni42MjQtMTM0LjI4NC0xODQuMTY0LTEzNC4yODQtOTUuOSAwLTE3NC4xNiA3Ni45OC0xNzYuMjQgMTcyLjRoMTkuOTZ2My44OGMwIDE3LjA5LjkgMzQuMjQgMy4zNyA1MC43NWgxNi43MWMxMS4wNDYgMCAyMC04Ljk1NCAyMC0yMHYtODguMzNjMzguMDggMjEuNzcgNzguNjYgMzguMzggMTIwLjY5IDQ5LjU1IDM2LjM4MSA5LjY2OSA3My44NSAxNS4yNTMgMTExLjcxIDE2LjU4MnYyMi4xOThjMCAxMS4wNSA4Ljk1IDIwIDIwIDIwaDE2LjcxYzIuMDQzLTEzLjY1NCAzLTI3Ljc0NyAzLjI3NC00MS44OGgxMC4wNTZjNS41MjMgMCAxMC00LjQ3NyAxMC0xMHYtMi43N2MtLjE4OC04LjYwNy0xLjAwNi0xNy4wNjItMi4zOTEtMjUuMzI2aC42OTljNi42NTIgMCAxMS40ODMtNi4zODUgOS42MTYtMTIuNzd6IiBmaWxsPSIjYjI0YTQ3Ii8+PHBhdGggZD0ibTExOS43MiAyMDUuMjVjMC05MC40MzkgNjguNDYzLTE2NS4xNzYgMTU2LjI4MS0xNzUuMTM5LTYuNTY3LS43NDUtMTMuMjM4LTEuMTQxLTIwLTEuMTQxLTk1LjkgMC0xNzQuMTYgNzYuOTgtMTc2LjI0IDE3Mi40aDE5Ljk2djMuODhjMCAxNy4wOS45IDM0LjI0IDMuMzcgNTAuNzVoMTYuNjN2LTUwLjc1eiIgZmlsbD0iIzllM2MzMyIvPjwvc3ZnPgo="
                />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

NotFound.propTypes = {
  status: PropTypes.any
};

export default connect()(NotFound);
