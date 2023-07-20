const query = `SELECT
    t.team_name AS name,
    SUM(
        CASE
            WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
            WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0 
        END
    ) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(
        CASE
            WHEN (m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals)
                OR (m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals)
                THEN 1
            ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
            WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN (m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals)
                OR (m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals)
                THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(
        CASE
            WHEN m.home_team_id = t.id THEN m.home_team_goals
            ELSE m.away_team_goals
        END
    ) AS goalsFavor,
    SUM(
        CASE
            WHEN m.home_team_id = t.id THEN m.away_team_goals
            ELSE m.home_team_goals
        END
    ) AS goalsOwn
FROM
    teams t
LEFT JOIN
    matches m ON t.id = m.home_team_id OR t.id = m.away_team_id
WHERE
    m.in_progress = false
GROUP BY
    t.team_name, t.id
ORDER BY
    totalPoints DESC,
    totalVictories DESC,
    (goalsFavor - goalsOwn) DESC,
    goalsFavor DESC;

`;

export default query;
