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
export default class PagesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardview: false,
      context: { componentParent: this },
      editItem: {},
      editItemContent: {},
      itemModView: false,
      itemContentModView: false,
      itemTab: 1,
      itemList: [],
      textFields: [
        "title",
        "link",
        "company",
        "location",
        "subtitle",
        "percentage",
        "location",
        "icon",
        "type",
        "institute",
        "client",
        "size",
      ],
      dateFields: ["startdate", "enddate"],
      RichEditorFields: ["desc"],
      textAreaFields: ["content"],
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
      newContent: [
        {
          name: "links",
          value: {
            icon: "",
            link: "",
            title: "",
            subtitle: "",
          },
        },
        {
          name: "progress",
          value: {
            title: "",
            startdate: "",
            percentage: "",
            subtitle: "",
          },
        },
        {
          name: "experience",
          value: {
            title: "",
            startdate: "",
            enddate: "",
            link: "",
            company: "",
            location: "",
            desc: "",
            content: [],
          },
        },
        {
          name: "education",
          value: {
            title: "",
            startdate: "",
            enddate: "",
            link: "",
            institute: "",
            location: "",
            desc: "",
            content: [],
          },
        },
        {
          name: "projects",
          value: {
            title: "",
            startdate: "",
            enddate: "",
            link: "",
            client: "",
            company: "",
            desc: "",
            size: "",
            content: [],
          },
        },
        {
          name: "otherprojects",
          value: {
            title: "",
            startdate: "",
            enddate: "",
            link: "",
            client: "",
            company: "",
            desc: "",
            size: "",
          },
        },
        {
          name: "awards",
          value: {
            title: "",
            startdate: "",
            enddate: "",
            institute: "",
            desc: "",
          },
        },
      ],
    };

    this.onInpCh = this.onInpCh.bind(this);
    this.addContent = this.addContent.bind(this);
  }

  componentDidMount() {
    api.readAll().then((itemList) => {
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
        .update(editItem.id, editItem)
        .then((x) => {
          ToastsStore.success(`Page Changes Updated!`);
        })
        .catch((e) => {
          ToastsStore.error(`Page Update Failed!`);
        });
    } else {
      editItem.created = new Date().getTime() * 10000;
      api
        .create(editItem)
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
      .delete(replistId)
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
  addContent = (tab) => {
    const { editItem, newContent } = this.state;
    var ind = newContent.find((x) => x.name === editItem.type);
    if (ind && ind.value) {
      if (tab === 1) {
        if (!editItem.hasOwnProperty("content")) {
          editItem.content = [];
        }
        editItem.content.push(JSON.parse(JSON.stringify(ind.value)));
      }
    }
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
    editItem.content[tab][name] = value;
    console.log(editItem.content[tab]);

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
    console.log(editItemContent);
    const DragHandle = sortableHandle(() => (
      <span className="col-md-1">::</span>
    ));
    let optionItems = newContent.map((item) => (
      <option key={item.name}>{item.name}</option>
    ));
    const SortableItem = sortableElement(({ value }) => (
      <>
        <div class="row">
          <DragHandle />

          <Input
            type="text"
            value={value.title}
            name="title"
            className="col-sm-12 col-md-3"
            onChange={(e) => this.onContentInpCh("title", e.target.value)}
          />
        </div>
      </>
    ));

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
                                <td>{si.subtitle}</td>
                                <td>{si.type}</td>
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
                      <Nav className="nav-tabs-info" role="tablist" tabs>
                        <NavItem>
                          <NavLink
                            className={itemTab === 1 ? "active" : ""}
                            onClick={(e) => this.toggleTabs(e, "itemTab", 1)}
                          >
                            BASIC
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={itemTab === 2 ? "active" : ""}
                            onClick={(e) => this.toggleTabs(e, "itemTab", 2)}
                          >
                            CONTENT
                          </NavLink>
                        </NavItem>
                      </Nav>
                      {/** */}
                      <TabContent className="tab-space" activeTab={itemTab}>
                        <TabPane tabId={1}>
                          <Container fluid className="pt-3">
                            <Row>
                              <Col className="col-sm-12 col-md-6">
                                <FormGroup>
                                  <label className="form-label">Name</label>
                                  <Input
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
                                  <label className="form-label">subtitle</label>
                                  <Input
                                    type="text"
                                    value={editItem.subtitle}
                                    name="subtitle"
                                    onChange={(e) =>
                                      this.onInpCh(
                                        1,
                                        "subtitle",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col className="col-sm-12 col-md-6">
                                <FormGroup>
                                  <label className="form-label">tag</label>
                                  <Input
                                    type="text"
                                    value={editItem.tag}
                                    name="tag"
                                    onChange={(e) =>
                                      this.onInpCh("tag", e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col className="col-sm-12 col-md-6">
                                <FormGroup>
                                  <label className="form-label">type</label>

                                  {editItem.id ? (
                                    <Input
                                      type="text"
                                      value={editItem.type}
                                      name="type"
                                      disabled={true}
                                    />
                                  ) : (
                                    <select
                                      onChange={(e) =>
                                        this.onInpCh("type", e.target.value)
                                      }
                                      class="form-control"
                                    >
                                      {optionItems}
                                    </select>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>{" "}
                            <Row>
                              <CKEditor
                                editor={ClassicEditor}
                                data={editItem.desc || ""}
                                onInit={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  console.log(
                                    "Editor is ready to use!",
                                    editor
                                  );
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
                            </Row>
                          </Container>
                        </TabPane>
                        <TabPane tabId={2}>
                          <Container fluid className="pt-3">
                            {" "}
                            <Row></Row>
                            {!editItem.content ||
                              (editItem.content.length === 0 && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  No Content to Show
                                </div>
                              ))}
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={(e) => this.addContent(1)}
                            >
                              Add
                            </button>
                            <SortableContainer
                              onSortEndContent={this.onSortEndContent}
                              useDragHandle
                            ></SortableContainer>
                            <Table>
                              <thead>
                                <tr className="text-uppercase">
                                  {editItem.content &&
                                    editItem.content.length > 0 &&
                                    editItem.content[0] &&
                                    Object.keys(editItem.content[0]).length >
                                      2 && <th> EDIT</th>}
                                  {editItem.content &&
                                    editItem.content.length > 0 &&
                                    Object.keys(
                                      editItem.content[0]
                                    ).map((key, i) => (
                                      <>{i < 2 && <th>{key}</th>}</>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                {editItem.content &&
                                  editItem.content.map((value, index) => (
                                    <tr>
                                      {value && Object.keys(value).length > 2 && (
                                        <td>
                                          <button
                                            className="btn btn-primary btn-sm"
                                            type="button"
                                            onClick={(e) =>
                                              this.openItemContentModal(index)
                                            }
                                          >
                                            EDIT
                                          </button>
                                        </td>
                                      )}
                                      {Object.keys(value).map((key, i) => (
                                        <>
                                          {i < 2 && (
                                            <td>
                                              <Input
                                                type="text"
                                                className="form-control-sm"
                                                value={value[key]}
                                                name="type"
                                                onChange={(e) =>
                                                  this.onContentInpCh(
                                                    index,
                                                    key,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </td>
                                          )}
                                        </>
                                      ))}
                                    </tr>
                                  ))}{" "}
                              </tbody>
                            </Table>
                          </Container>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                  <hr />
                  <button className="btn btn-info">Create / Update</button>
                </Container>
              </form>{" "}
            </ModalBody>
          </Modal>
        </Container>
        <Modal
          isOpen={this.state.itemContentModView}
          toggle={this.openItemContentModal}
          className="modal-lg lg"
        >
          <ModalHeader toggle={this.closeItemContentModal} className="h2">
            Edit Content
          </ModalHeader>
          <ModalBody>
            <form
              className="todo-create-wrapper"
              onSubmit={(e) => {
                e.preventDefault();
                this.updateContentItem();
              }}
            >
              <Container fluid>
                {editItemContent &&
                  Object.keys(editItemContent).length > 0 &&
                  Object.keys(editItemContent).map((key, i) => (
                    <Row className="pb-2">
                      <Col className="col-sm-12 col-md-2">
                        <label className="align-right text-uppercase">
                          {key}
                        </label>
                      </Col>
                      <Col className="col-sm-12 col-md-10">
                        {textFields.includes(key) && (
                          <Input
                            type="text"
                            value={editItemContent[key]}
                            name={key}
                            onChange={(e) =>
                              this.onContentInpCh(cc, key, e.target.value)
                            }
                          />
                        )}
                        {dateFields.includes(key) && (
                          <Input
                            type="date"
                            value={editItemContent[key]}
                            name={key}
                            onChange={(e) =>
                              this.onContentInpCh(cc, key, e.target.value)
                            }
                          />
                        )}
                        {RichEditorFields.includes(key) && (
                          <CKEditor
                            editor={ClassicEditor}
                            data={editItem.desc || ""}
                            onInit={(editor) => {}}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              this.onContentInpCh(cc, key, data);
                            }}
                          />
                        )}
                        {textAreaFields.includes(key) && (
                          <textarea
                            type={key}
                            class="form-control"
                            value={editItemContent[key]}
                            name="tag"
                            onChange={(e) =>
                              this.onContentInpCh(cc, "tag", e.target.value)
                            }
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
              </Container>
            </form>{" "}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
