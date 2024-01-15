const openvideocall = (linkToOpen) => {
  const handleSvgClick = () => {
    window.open(linkToOpen, '_blank'); // '_blank' opens the link in a new tab
  };

  return handleSvgClick;
};

export default openvideocall;