/** @type {import('next').NextConfig} */

module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/api/**",
          destination: "http://api.openweathermap.org/**",
        },
      ];
    };
    return {
      rewrites,
    };
  };
