import React, { Component } from "react";

import Axios from "../utils/Axios";

import "./TeamPage.css";

export class TeamPage extends Component {
  state = {
    teamArray: [],
    ourTeam: "",
  };

  componentDidMount = async () => {
    try {
      let getTeamPlayers = await Axios.get("/api/pics/team-images");
      let teamPlayersArray = getTeamPlayers.data.payload;
      let teamId = getTeamPlayers.data.payload[0].team[0];
      let getTeam = await Axios.get(`/api/team/get-team/${teamId}`);
      let teamName = getTeam.data.payload.teamName;
      this.setState({
        teamArray: teamPlayersArray,
        ourTeam: teamName,
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { ourTeam, teamArray } = this.state;
    return (
      <div>
        <div className="team-header">
          <h1>Team Page</h1>
        </div>
        <div className="content-container">
          <div className="team-roster">
            <table>
              <thead>
                <tr>
                  <th>{ourTeam}</th>
                </tr>
              </thead>
              <tbody>
                {/* do a .map of the player array w/image,names. use <tr>and <td> */}
              </tbody>
            </table>
            {/* insert pagination */}
          </div>
          <div className="schedule-stats-container">
            <div className="schedule">schedule</div>
            <div className="stats">stats</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamPage;
