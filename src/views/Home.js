import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import arrayMove from "array-move";
import api from "../utils/api";

import { getRecordID, responseValidator } from "../utils/grid";
import { simpleHttpRequest } from "ag-grid-community";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardview: false,
      context: { componentParent: this },
      editItem: {},
      editItemContent: {},
      itemModView: false,
      itemContentModView: false,

      cc: 0,
      newItem: {
        id: 1,
        tag: "",
        type: "",
        title: "",
        subtitle: "",
        desc: "",
        content: [],
      },
    };

    this.onInpCh = this.onInpCh.bind(this);
    this.addContent = this.addContent.bind(this);
  }

  componentDidMount() {
    api.readAllList().then((itemList) => {
      responseValidator(itemList);
      const optimisedData = [];
      if (itemList.length > 0) {
        itemList.forEach(function (item, index) {
          let itemis = item.data;
          itemis.id = getRecordID(item);
          optimisedData.push(itemis);
        });
        this.setState({
          itemList: optimisedData,
        });
      }
    });
  }
  toggle = () => {
    const { itemModView } = this.state;
    this.setState({
      itemModView: !itemModView,
    });
  };

  saveItem = () => {
    const { editItem } = this.state;
    editItem.modified = new Date().getTime() * 10000;
    if (editItem.id) {
      api
        .updateList(editItem.id, editItem)
        .then((x) => {
          ToastsStore.success(`Page Changes Updated!`);
        })
        .catch((e) => {
          ToastsStore.error(`Page Update Failed!`);
        });
    } else {
      editItem.created = new Date().getTime() * 10000;
      api
        .createList(editItem)
        .then((response) => {
          console.log(response);
          ToastsStore.success(`Page Created Succesfully!`);
        })
        .catch((e) => {
          ToastsStore.error(`Page Creation Failed!`);
        });
    }
  };
  deletePage = (e) => {
    const { itemList } = this.state;
    const replistId = e.target.dataset.id;

    // Optimistically remove replist from UI
    const filteredPages = itemList.reduce(
      (acc, current) => {
        const currentId = getRecordID(current);
        if (currentId === replistId) {
          acc.rollbackPage = current;
          return acc;
        }
        // filter deleted replist out of the itemList list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackPage: {},
        optimisticState: [],
      }
    );

    this.setState({
      itemList: filteredPages.optimisticState,
    });

    // Make API request to delete replist
    api
      .deleteList(replistId)
      .then(() => {
        ToastsStore.success(`deleted replist id ${replistId}`);
      })
      .catch((e) => {
        ToastsStore.success(`There was an error removing ${replistId}`, e);
        this.setState({
          itemList: filteredPages.optimisticState.concat(
            filteredPages.rollbackPage
          ),
        });
      });
  };

  openUserModal = (id) => {
    this.setState({
      editItem: this.state.itemList[id],
      itemModView: true,
    });
  };
  openItemContentModal = (ci) => {
    console.log(this.state.editItem.content[ci]);
    this.setState({
      cc: ci,
      editItemContent: this.state.editItem.content[ci],
      itemContentModView: true,
    });
  };
  closeItemContentModal = () => {
    this.setState({
      itemContentModView: false,
    });
  };

  newitemModView = () => {
    const { editItem, newItem } = this.state;
    const itemDoc = {
      data: JSON.parse(JSON.stringify(newItem)),
    };

    this.setState({
      editItem: itemDoc,
      itemModView: true,
    });
  };
  addContent = () => {
    const { editItem } = this.state;
    editItem.technology.push({ name: "", address: "" });
    this.setState({ editItem });
  };

  addTag = () => {
    const { editItem } = this.state;
    editItem.tags.push("");
    this.setState({ editItem });
  };

  deleteTag = (index) => {
    const { editItem } = this.state;
    editItem.tags.splice(index, 1);
    this.setState({ editItem });
  };

  onContentDelete = (index) => {
    const { editItem } = this.state;
    editItem.technology.splice(index, 1);
    this.setState({ editItem });
  };
  onEditorStateChange = (tab, name, value) => {
    const { editItem } = this.state;

    var ind = editItem.data[tab].list.findIndex((x) => x.field === name);
    if (ind >= 0) {
      editItem.data[tab].list[ind].val = value;
    }
    this.setState({ editItem });
  };

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index,
    });
  };
  onSortEndContent = ({ oldIndex, newIndex }) => {
    const { editItem } = this.state;
    editItem.content = arrayMove(editItem.content, oldIndex, newIndex);
    this.setState({ editItem });
  };

  onInpCh = (name, value) => {
    const { editItem } = this.state;
    editItem[name] = value;
    this.setState({ editItem });
  };

  onContentInpCh = (tab, name, value) => {
    console.log({ tab, name, value });
    const { editItem } = this.state;
    editItem.technology[tab][name] = value;

    this.setState({ editItem });
  };
  onTagInpCh = (tab, value) => {
    const { editItem } = this.state;
    editItem.tags[tab] = value;

    this.setState({ editItem });
  };

  render() {
    const {
      editItem,
      itemList,
      itemTab,
      newContent,
      editItemContent,
      textFields,
      dateFields,
      textAreaFields,
      RichEditorFields,
      cc,
    } = this.state;

    const SortableContainer = sortableContainer(({ children }) => {
      return <>{children}</>;
    });
    return (
      <>
        <Container className="pt-3" fluid>
          <ToastsContainer store={ToastsStore} />
          <div className="container">
            <div className="row">
              <Col md="12">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <div
                      style={{
                        minHeight: "50vh",
                        width: "100%",
                      }}
                      className="ag-theme-alpine"
                    >
                      <Row className="align-items-center pb-2">
                        <div className="col">
                          <h4 className="mb-0">Sections List</h4>
                        </div>
                        <div className="col text-right">
                          <Button onClick={this.newitemModView}>
                            <i className="fa fa-plus"></i> ADD
                          </Button>
                        </div>
                      </Row>
                      <Table>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>title</th>
                            <th>subtitle</th>
                            <th>Type</th>
                            <th>Tags</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemList &&
                            itemList.length > 0 &&
                            itemList.map((si, i) => (
                              <tr key={`itemList${i}`}>
                                <th scope="row">
                                  <span
                                    onClick={() => this.openUserModal(i)}
                                    className="btn btn-primary btn-sm"
                                  >
                                    {i + 1} EDIT
                                  </span>
                                </th>
                                <td>{si.title}</td>
                                <td>{si.name}</td>
                                <td>{si.subtitle}</td>
                                <td>{si.tags}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <br />
                    </div>
                    <br /> <br /> <br />
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>

          <Modal
            isOpen={this.state.itemModView}
            toggle={this.toggle}
            className="modal-lg lg"
          >
            <ModalHeader toggle={this.toggle} className="h2">
              Page
            </ModalHeader>
            <ModalBody>
              <form
                className="todo-create-wrapper"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.saveItem();
                }}
              >
                <Container fluid>
                  <Row>
                    <Col md="12">
                      {/*nav Menu*/}
                      <Container fluid className="pt-3">
                        <Row>
                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">Name</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.title}
                                name="title"
                                onChange={(e) =>
                                  this.onInpCh("title", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">Title</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.subtitle}
                                name="title"
                                onChange={(e) =>
                                  this.onInpCh("subtitle", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">bgr</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.bgr}
                                name="bgr"
                                onChange={(e) =>
                                  this.onInpCh("bgr", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">img</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.img}
                                name="img"
                                onChange={(e) =>
                                  this.onInpCh("img", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">git</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.git}
                                name="link"
                                onChange={(e) =>
                                  this.onInpCh("git", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">link</label>
                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.link}
                                name="link"
                                onChange={(e) =>
                                  this.onInpCh("link", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">tag</label>
                              <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={(e) => this.addTag()}
                              >
                                Add
                              </button>
                              {editItem.tags &&
                                editItem.tags.map((value, index) => (
                                  <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend">
                                      <Button
                                        type="button"
                                        onClick={(e) => this.deleteTag(index)}
                                      >
                                        x
                                      </Button>
                                    </InputGroupAddon>

                                    <Input
                                      type="text"
                                      size="sm"
                                      value={value}
                                      name="name"
                                      onChange={(e) =>
                                        this.onTagInpCh(index, e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                ))}{" "}
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-12 col-md-6">
                            <FormGroup>
                              <label className="form-label">type</label>

                              <Input
                                className="form-control-sm"
                                type="text"
                                value={editItem.type}
                                name="type"
                                onChange={(e) =>
                                  this.onInpCh("type", e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="col-sm-12 col-md-12">
                            <label className="form-label">desc</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={editItem.desc || ""}
                              onInit={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                this.onInpCh("desc", data);
                                console.log({
                                  event,
                                  editor,
                                  data,
                                });
                              }}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          {" "}
                          <Col className="col-sm-12 col-md-12">
                            <label className="form-label">story</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={editItem.story || ""}
                              onInit={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                this.onInpCh("story", data);
                                console.log({
                                  event,
                                  editor,
                                  data,
                                });
                              }}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <hr />
                          <button
                            className="btn btn-primary btn-sm"
                            type="button"
                            onClick={(e) => this.addContent()}
                          >
                            Add
                          </button>

                          <Table>
                            <thead>
                              <tr className="text-uppercase">
                                <th></th> <th>Name</th>
                                <th>List</th>
                              </tr>
                            </thead>
                            <tbody>
                              {editItem.technology &&
                                editItem.technology.map((value, index) => (
                                  <tr>
                                    <td>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                        onClick={(e) =>
                                          this.onContentDelete(index)
                                        }
                                      >
                                        X
                                      </button>
                                    </td>{" "}
                                    <td>
                                      <Input
                                        type="text"
                                        className="form-control-sm"
                                        value={value.name}
                                        name="name"
                                        onChange={(e) =>
                                          this.onContentInpCh(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <Input
                                        type="text"
                                        className="form-control-sm"
                                        value={value.address}
                                        name="address"
                                        onChange={(e) =>
                                          this.onContentInpCh(
                                            index,
                                            "address",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                  <hr />
                  <button className="btn btn-info">Create / Update</button>
                </Container>
              </form>{" "}
            </ModalBody>
          </Modal>
        </Container>
      </>
    );
  }
}
