import React, { useState, useEffect, useCallback } from "react";
import { buildChart } from "../../utils";
import styles from "./Charts.module.scss";
import sectionStyles from "../UserRepos/UserRepos.module.scss";

const Charts = ({ langData, repoData }) => {
  console.log(langData);
  console.log(repoData);

  // create chart with languageData
  const [langChartData, setLangChartData] = useState(null);
  // create chart for most starred repos
  const [starChartData, setStarChartData] = useState(null);
  // create chart for stars per language
  const [starsLangStats, setStarsLangStats] = useState(null);
  // create chart for largest size distribution/repo
  const [largestInSizeStats, setLargestInSizeStats] = useState(null);

  const languageChart = useCallback(() => {
    const canvasElement = document.getElementById("langChart");
    // console.log(canvasElement);
    const labels = langData.map(lang => lang.label);
    const data = langData.map(lang => lang.value);

    setLangChartData(data);
    if (data.length > 0) {
      const backgroundColor = langData.map(({ color }) => color);
      const borderColor = langData.map(lang => `${lang.color}`);
      const chartType = "pie";
      const axes = false;
      const legend = true;
      const config = {
        canvasElement,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  }, [langData]);

  const mostStarredChart = useCallback(() => {
    const canvasElement = document.getElementById("starChart");
    // fetch top five repos
    const LIMIT = 5;
    const sortProperty = "stargazers_count";
    const mostStarredRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map(repo => repo.name);
    const data = mostStarredRepos.map(repo => repo[sortProperty]);
    // console.log({ data, labels });

    setStarChartData(data);
    if (data.length > 0) {
      const backgroundColor = langData.map(({ color }) => color);
      const borderColor = langData.map(lang => `${lang.color}`);
      const chartType = "bar";
      const axes = true;
      const legend = false;
      const config = {
        canvasElement,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  }, [langData, repoData]);

  const starsAcheivedPerLanguage = useCallback(() => {
    const canvasElement = document.getElementById("starsPerLang");
    const filteredRepos = repoData.filter(
      repo => !repo.fork && repo.stargazers_count > 0
    );
    const uniqueLangs = new Set(filteredRepos.map(repo => repo.language));
    const labels = Array.from(uniqueLangs.values()).filter(l => l);
    const data = labels.map(lang => {
      const repos = filteredRepos.filter(repo => repo.language === lang);
      const starsArr = repos.map(r => r.stargazers_count);
      const starSum = starsArr.reduce((a, b) => a + b, 0);
      return starSum;
    });

    setStarsLangStats(data);
    if (data.length > 0) {
      const backgroundColor = langData.map(({ color }) => color);
      const borderColor = langData.map(lang => `${lang.color}`);
      const chartType = "doughnut";
      const axes = false;
      const legend = true;
      const config = {
        canvasElement,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  }, [langData, repoData]);

  const largestInSizeChart = useCallback(() => {
    const canvasElement = document.getElementById("largestInSize");
    const LIMIT = 5;
    const sortProperty = "size";
    const mostStarredRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map(repo => repo.name);
    const data = mostStarredRepos.map(repo => repo[sortProperty]);

    setLargestInSizeStats(data);
    if (data.length > 0) {
      const backgroundColor = langData.map(({ color }) => color);
      const borderColor = langData.map(lang => `${lang.color}`);
      const chartType = "bar";
      const axes = true;
      const legend = false;
      const config = {
        canvasElement,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  }, [langData, repoData]);

  useEffect(() => {
    if (langData.length > 0 && repoData.length > 0) {
      languageChart();
      mostStarredChart();
      starsAcheivedPerLanguage();
      largestInSizeChart();
    }
  }, [
    languageChart,
    mostStarredChart,
    starsAcheivedPerLanguage,
    largestInSizeChart,
    langData.length,
    repoData.length,
  ]);

  const firstChartError = !(langChartData && langChartData.length > 0);
  const secondChartError = !(starChartData && starChartData.length > 0);
  const thirdChartError = !(starsLangStats && starsLangStats.length > 0);
  const fourthChartError = !(
    largestInSizeStats && largestInSizeStats.length > 0
  );

  return (
    <div
      className={sectionStyles.section}
      style={{ backgroundColor: "#2e2f34", color: "#fff" }}
    >
      <div className={styles.chartStyles}>
        <div className={styles.chart}>
          <header>
            <h2>Top Languages</h2>
          </header>
          <div className="chart_container">
            {firstChartError && <p>No data found!</p>}
            <canvas id="langChart" width={300} height={300} />
          </div>
        </div>
        <div className={styles.chart}>
          <header>
            <h2>Most Starred</h2>
          </header>
          <div className="chart_container">
            {secondChartError && <p>No data found!</p>}
            <canvas id="starChart" width={300} height={300} />
          </div>
        </div>
        <div className={styles.chart}>
          <header>
            <h2>Stars per Language</h2>
          </header>
          <div className="chart_container">
            {thirdChartError && <p>No data found!</p>}
            <canvas id="starsPerLang" width={300} height={300} />
          </div>
        </div>
        <div className={styles.chart}>
          <header>
            <h2>
              Largest in size<sub>(kb)</sub>
            </h2>
          </header>
          <div className="chart_container">
            {fourthChartError && <p>No data found!</p>}
            <canvas id="largestInSize" width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
