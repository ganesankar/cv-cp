import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";

export default class UserItemCard extends Component {
  render() {
    const { student } = this.props;
    const userIcon =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4NDQ0NDg0NEA4NDQ4NDxAPDg8NEBMNFxEiFxURExMbKDQiGBonGxUfITEiJiorNjouFyEzODYuQygtOisBCgoKDg0NFQ0QGC0iHR0rNy4tLS0tKysrLSs3Ky0wLS0tMisrKy0tLS0tKystLS0rLS8tLSsvKystLSsrLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAQMC/8QAOhABAAIBAgIECwYGAwEAAAAAAAECAwQRBRIGITFREyJBU2FxgZGUocEUFTJScrFCYmOTsuGi0fAj/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECBAUDBv/EADMRAQACAQIBCQcDBQEAAAAAAAABAgMEESEFEhMxUWFxodEiMkFSksHwkbHhFCNCgfEz/9oADAMBAAIRAxEAPwC/d98eICBACIIoiAEIACAgIAggICAAgAICAgAICIIAogOoyECUAQRRARCQEBAAQEAQQEBAQAEBAAQEABEEUQEQdRmA4g6iAogIggAICAgAIgAgICAAgICAAgAIgiiIIDqMxAgBEEURACEABAQEAQQEBAAQAEBAQAEBEEAURBAdRmSgCCKICISAgIACAgCCAgIACAgIACAgAIgiiAiADqM3EHUQFEBEEABAQEABEAEBAQAEBAQAEABEEURBAAdNmAIgigggQgAICAgAIggIACAAgICAAgIggCiIIAEumzBBFEBEJAQEABAQBF7w3ozmyxF8k+CpPXETG95j9Pk9vua989Y4RxdLBybkyRzr+zHn/H5wT54Rw3F4uTPE2jti2asT7q7PLpctuqPJszpNHj4Xtx759NiOGcMydVM1YmezbPG/six0mWOuPI/ptFfhW3n6onEOi2SkTbBfwkdvLO1b7eieyfkyrniet45uS71jfHO/d8fz9GftWYmYmJiYnaYmNpie6Ye7lTExO0uICAAgIACIIogIgADjps3UQFEBEAEBAAYgDS9GOG0rSdZm2itN5x83ZEV7ck+7q9W/c1c+Sd+jq63J+nrFf6jJ1R1evog8Y47k1FprSbUw9kVidptHfefozx4Yrxnra2q11807V4V/fx9FQ9WiILDhXF82ltHLM2x+XHafF2/l/LLzvjiza0+ryYJ4TvHZ+dS847o8erwRrcH4orzW6tptSO2Jj81dvlt3PDHaaW5kujrMNNRi/qcfX+8esMm2XEEBAAQAEQRREEAAHHTZuogKIggIACAgIPvDjm960jtvatI9cztCTO0brWs2tFY+PBqOlmaMODDpadVZiN4/p022j3/s1MEc603l2eUrxjxUwV6vtDKNtxBiACDSdDNXtfJp5/DevhKx/NHVMe2P8WvnrwizrclZdrWxT1TxUvFNN4HUZcUdlLzy/onrr8ph60tvWJc/UY+jy2p2T/xFV4iAAgICICiIIACBDqMxAQEQAQEABAQWHR+nNrNPE/n391Zn6PLN7ktnRRvqKR3/AGTOmF99XEflw0j5zP1Yaf3HvypO+fbu9VG9nOEABBZdHb8uswT32tHsmkw88vuS29DO2pp+fCUjpdTbVzP5sVLT84+jDD7j15TjbUeMQpXq54gIACIIAoxQAQAHTZAogIgAgIACAgn8Avy6zTz/AFOX3xMfV5ZY3pLZ0U7aik96b0xptqonyWw0n280ww08+w2OVI2zxPbHqo3s5ogIALLo5Tm1mD0WtafZSZeWX3JbegjfU0/PhKR0uvvq5j8uOlf3n6scPuPXlOd9R4RClerniAgAIgiiIIACAA6bIFEQQEABAQEAH3iyTS9bx20tW8euJ3j9mMxvGy1tNbRaPhxajpfijJhwamnXWOrf+S8b1n5fNq6edrTWXY5TrF8dM1er7SyjZcUAQAaPoXpt8uTNPZSvJH6rTvPuiPm189uEQ6vJWPe9snZwU3FdR4bUZskdlrzy/pjqr8oh6UjasQ0NTk6TNe/bKKrxAEABigKIggAIADpsxARACEBAAQEAQQavo5qKanTZNFlnrrWeXvnHM9Ux6az9Gpmia3i8O3oclc2GdNf4ft/Hozmu0d9PktiyR117J8lq+S0eh71tFo3hyc2G2K80sjsnkIPTBhtkvXHSs2vadoiO9JmIjeWVKWvaK1jeZavX2rw/QxgrMeFyxMbx2zafx39kdUexq1/uX3+Dt5pjSaboon2p/Jn87mQbLhCAgAIggCiIICAAgOozEBEAEBAAQEBEAemnz3xXrkpaa3rO8TDG0RMbSzpe1LRes8YbHQajDxPFauXF4+Ll5vRNt9rUt2x+Hs/dp2rbFO8T1u9hyY9bSa3rxj84MXeNpmO6Zj5tt8/MbTMODFs8U4OHaXHnjHNr5a0rv/Fa815tpmfw16vI0552S0xu+gr0WjwVyRXeZ8523/1DKa7WZNRknLkne09URHZFfJWI7mzWsVjaHFzZrZbzeyOryEBAARBFEQQAEABAdRmIggIACAgIACIsdHwPU5tprimtZ/iyeJHu7fk8rZqV+LbxaLNk6q7R38P58lzg6K46RzajP1R28u1Kx67T/p4zqJnhWG/TkulY52W/2/d74uJcP0UWjDPNa23N4PmyTbbs8eery9/lYzTJfreldRpNNExj4+HHz6mPtO8zPfMy2nCmd53cEa3BxXRajBiwajevJWkbWi0RzxXbeLV7Pbt2tWaXraZq7dNVps2KuPL8O3t8YfOTozgyxzafUdXrrlp6t46/3OmtHC0Jbk3FkjnYr/eFTrOj2qxbzyeEr3455v8Aj2/JnGWstLLyfnx8dt47vzdVzG0zE9Ux1TE9UxL0aXVwcQAEQRREEABAQAHTZiIAQgAICAgsuD8Gy6qd48THE7TeY39lY8svLJlini29No7553jhHb6L6b6Dh3VEc+aPVkyb+meynq6mv/cy+Dpb6XR8I42/Wf4Vmt6UajJvGOK4q+jx7++er5PSunrHXxaeXlPLbhX2Y/Wfz/Smz575J5sl7Xnvtabfu9YiI6mhe9rzvad/F5qwEABB9Y8lqTzUtatu+szWffDGeK1tNZ3rO0rfR9JdTi2i0xlr3Xja23otH13edsVZb2LlLNTr9qO/1/6tqa/Q6/amakUyz1RzeLO/dXJHb6p9zy5t6dTejPpdV7N42t3/AGn88FRxngGTTb5KzOTD5Z28av6o7vT+z0pki3Bo6rQXw+1XjXzjx9VOzc8QBREEBAAQAHTZiISAgIACCbwjQTqc9cXXFfxXmPJSO3/r2vPJfmV3bGmwdNlinw+PgvekPFvs8RpNNtTlrEWtXq5a7dVa907de/p92thx8727OjrtV0UdBi4bdfd3QyrbcUQEBAAQEABARGj6N8atFq6bNPNjv4lLW65rM9lJ74ns/wDdXjkp/lDraDWzExhyTvE9Xp4IPSLhsabN4sf/ACyRNqejvr7N/dMMqW50NbXabocnD3Z6vRVMmmIggAIACAgOoyEBAAQEBBquhuOK49Rnnvinqiteaf8AL5NTUzvMVdnkusRS+WfD9OP3ZjNlnJe2S34r2m8+uZ3bMRtGzj3vN7TefjxfCsRAQEABAQEABABreOz9o4dizz+Kvg7z658W0e+fk16cLzDt6z+7o65fjG0/aWSeziCIIACAgAIDpsgCEABAQEGs4T4vCs9u+uon27bfRp5OOaI8Ha03DQXnulk224ggIACAAgICAgAIjWaXxuD3if4aZflkmYeE/wDo7eP2uTp7on92TeziiIIACAgIADpsiQEBAAQEGr4Fq9NOi+z5stK7zkratrck7Tbfqn1S08tb9Jzqw7Ojy4Z03RZLRHXvx2Pu/hXn6fEHPzdnkvQaH5o+o+wcK8/T4hOfm7PI6DQ/NH1H2DhXnqfEHPzdnkdBofmj6j7Bwrz1PiDn5ezyOg0PzR9R9g4V56n99Ofl7PJOg0HzR9R938K89T4g5+Xs8joNB80fUfd/CvPU+IOdl7PI6DQfNH1H3fwrz1P76c7L2eR0Gg+aPqPu/hXn6fEHOydh0Gg+aPqPu/hXnqfEHOydh0Gg+aPqPu/hXnqfEJzsnYdBoPmj6j7v4V56nxBzsnYdBoPmj6nrq9To8OizYMOak70vFaxfntNrf7lIi02iZhnlyafHpr4sdo6p+O/Wx72cIRABAAQEAQdNmIACAgIACIAICAgAICAgAIACIIoiCAAgIACIAOmzIQAEBAQBBAQEABAAQEBAAQEQQBREEABAQEAQQJdRmICAAgIAggICAAgICAAgIACIIogIgAgAICAIIDqMxAQEBAARABAQEABAQEABAARBFEQQAEBAAQEQAh02YAgICAAiCAgAIACAgIACAiCAKIggAICAgCCAA6bMQAEBAEEBAQAEBAQAEBAARBFEBEAEABAQBBAAdNmIADEAEQAQEBAAQEBAAQAEQRREEABAQAEBEAEB1GYgICAAiACAgIACAgIACAAiCKIggAICAAiCAgA//9k=";
    

    return (
      <React.Fragment>
        <Container className="align-items-center pt-5">
          <Row>
            <Col lg="6" md="6" className="d-none d-sm-block">
              <h5 className="text-on-back">{student.roll || ""}</h5>
              <h1 className="profile-title text-left"> {student.name || ""}</h1>
              <h4 className="text-on-back-sm">{student.spr || ""}</h4>
              <p className="profile-description">{student.description || ""}</p>
              <div className="btn-wrapper profile pt-3">
                {student.social &&
                  Object.keys(student.social).map(sociallink => {
                    return (
                      <React.Fragment key={sociallink}>
                        {student.social[sociallink] && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink}
                            href={student.social[sociallink]}
                            target="_blank"
                            className="btn btn-icon btn-round"
                          >
                            <i className={`fa fa-${sociallink}`}></i>
                          </a>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>
            <Col className="ml-auto mr-auto" lg="6" md="6">
              <Card className="card-coin card-plain">
                <CardHeader>
                  <img
                    alt="cmsImage"
                    className="img-center img-fluid  rounded-circle"
                    src={student.flagimg ? student.flagimg.base64 : userIcon}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="text-center" md="12">
                    <h3 className="d-block .d-sm-none">{student.name}</h3>
                      <h4 className="text-uppercase">{student.othername}</h4>
                      <hr className="line-success" />
                    </Col>
                  </Row>
                  <Row>
                    <ListGroup>
                    {student.roll && (
                        <ListGroupItem className="d-block d-sm-none"> R.No {student.roll}</ListGroupItem>
                      )}
                      {student.spr && (
                        <ListGroupItem className="d-block d-sm-none"> SPR.No {student.spr}</ListGroupItem>
                      )}
                      {student.dob && (
                        <ListGroupItem> <i className="fa  fa-birthday-cake"></i> {student.dob}</ListGroupItem>
                      )}
                      {student.anniversary && (
                        <ListGroupItem> <i className="fa fa-star"></i> {student.anniversary}</ListGroupItem>
                      )}
                      {student.email && (
                        <ListGroupItem><i className="fa fa-envelope"></i> {student.email}</ListGroupItem>
                      )}
                      {student.location && (
                        <ListGroupItem><i className="fa fa-map-marker"></i>  {student.location}</ListGroupItem>
                      )}
                      {student.native && (
                        <ListGroupItem><i className="fa fa-street-view"></i>  {student.native}</ListGroupItem>
                      )}
                      {student.work && (
                        <ListGroupItem><i className="fa fa-briefcase"></i>  {student.work} - {student.designation}</ListGroupItem>
                      )}
                      {student.social && (
                        <ListGroupItem className="d-block d-sm-none">
                          
                          {student.social &&
                  Object.keys(student.social).map(sociallink => {
                    return (
                      <React.Fragment key={sociallink}>
                        {student.social[sociallink] && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink}
                            href={student.social[sociallink]}
                            target="_blank"
                            className="btn btn-icon btn-round"
                          >
                            <i className={`fa fa-${sociallink}`}></i>
                          </a>
                        )}
                      </React.Fragment>
                    );
                  })}</ListGroupItem>
                      )}
                      
                    </ListGroup>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
