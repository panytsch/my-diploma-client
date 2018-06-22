import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Board from "react-trello";
import styled from "react-emotion";

import config from "../Configs/mainConfig";
import Header from "../Components/Big/HeaderMainPage";
import AsideSearch from "../Components/Big/AsideSearch";
import ButtonTR from "../Components/Small/Button/ButtonTR";
import LaneHeader from "../Components/Small/LaneHeader/LaneHeader";

const defaultData = [
  {
    id: "kaka",
    title: "loading...",
    cards: []
  }
];

const Contain = styled("div")`
  display: flex;
  ${".aside"} {
    background-color: rgb(196, 45, 141);
    flex-grow: 1;
    flex-shrink: 0;
    ${"& .newLine"} {
      margin: 1em 2em;
      ${"& *"} {
        margin: 0.2em;
      }
    }
  }
`;

class StickBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCardVisible: true
    };
    console.log("contsructor");
  }
  componentWillMount() {
    if (!this.props.data || !this.props.data.user) {
      this.props.history.push("/");
    } else if (
      !this.props.data.data ||
      !this.props.data.data[this.props.data.user.nickname]
    ) {
      this.props.fetchData(
        this.props.data.user.token,
        this.props.data.user.nickname
      );
    }
  }
  setVisibleCancel() {
    this.setState(
      Object.assign(this.state, {
        addCardVisible: !this.state.addCardVisible
      })
    );
  }

  render() {
    const id = this.props.match.params.board;
    const { nickname } = this.props.data.user || null;
    let obj =
      (nickname &&
        this.props.data.data &&
        this.props.data.data[nickname] &&
        this.props.data.data[nickname][id]) ||
      null;
    let linesData = {
      lanes: (obj && [...obj.stick]) || defaultData
    };
    return (
      <div>
        <Header autorize={false} registration={false} logout={true} />
        <Contain>
          <Board
            data={{ ...linesData }}
            onDataChange={newData => ({ ...newData })}
            style={{ flexGrow: 3, flexShrink: 0, flexBasis: "70%" }}
            draggable
            onCardDelete={(cardId, lineId) => {
              console.log(cardId, lineId);
              this.props.removeCardOne(
                this.props.data.user.token,
                nickname,
                +lineId,
                +cardId,
                id
              );
            }}
            editable
            onCardAdd={(card, laneId) => {
              this.props.addCardItem(
                this.props.data.user.token,
                nickname,
                card.title,
                card.description,
                +laneId
              );
            }}
            customLaneHeader={
              <LaneHeader
                handleClick={this.props.deleteLine}
                token={this.props.data.user.token}
                nickname={nickname}
                boardId={id}
              />
            }
            handleDragStart={(cardId, laneId) => {
              console.log("card", cardId);
              console.log("lane", laneId);
            }}
            handleDragEnd={(cardId, sourceLaneId, targetLaneId, position) => {
              console.log(cardId, sourceLaneId, targetLaneId, position);
              this.props.changeCardPos(
                this.props.data.user.token,
                nickname,
                cardId,
                sourceLaneId,
                targetLaneId,
                position,
                id
              );
            }}
            // laneSortFunction={(card1, card2) => card1.position - card2.position}
          />
          <div className="aside">
            <div className="newLine">
              {!this.state.addCardVisible && (
                <div>
                  <input type="text" ref={e => (this.addCardInput = e)} />
                </div>
              )}
              <ButtonTR
                onClick={() => {
                  !this.state.addCardVisible &&
                    this.props.addCard(
                      this.props.data.user.token,
                      nickname,
                      (this.addCardInput && this.addCardInput.value) ||
                        "default",
                      id
                    );
                  this.setVisibleCancel();
                }}
                text={this.state.addCardVisible ? "Add Card" : "Add"}
                color="#03aa37"
                hover="#067328"
              />
              <ButtonTR
                onClick={this.setVisibleCancel.bind(this)}
                text="Cancel"
                color="#fe5f5f"
                hover="#ad0505"
                display={this.state.addCardVisible ? "none" : "inline-block"}
              />
            </div>
            <AsideSearch
              token={this.props.data.user.token}
              nickname={nickname}
            />
            <div />
          </div>
        </Contain>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: (token, nickname) => dispatch(config.getBoards(token, nickname)),
  addCard: (token, nickname, title, boardId) => {
    dispatch(config.postLine(token, nickname, title, boardId));
  },
  deleteLine: (token, nickname, lineId, boardId) =>
    dispatch(config.removeLine(token, nickname, lineId, boardId)),
  removeCardOne: (token, nickname, lineId, cardId, boardId) =>
    dispatch(config.removeCard(token, nickname, lineId, cardId, boardId)),
  addCardItem: (token, nickname, title, description, lineId) =>
    dispatch(config.addItem(token, nickname, title, description, lineId)),
  changeCardPos: (
    token,
    nickname,
    itemId,
    lineId,
    newLineId,
    position,
    boardId
  ) =>
    dispatch(
      config.changeCardPosition(
        token,
        nickname,
        itemId,
        lineId,
        newLineId,
        position,
        boardId
      )
    )
});

const mapStateToProps = state => ({
  data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(StickBoard)
);
