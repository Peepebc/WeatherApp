/** @type {import('next').NextConfig} */

module.exports = () => {
    const rewrites = () => {
      return [
        {
            source: '/api/:path*',
            destination: 'http://api.openweathermap.org/:path*' // Proxy to Backend
        }
      ];
    };
    return {
      rewrites,
    };
  };
