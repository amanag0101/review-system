// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Review {
    string public name = "Review";
    // store post
    uint public postCount = 0;
    mapping(uint => Post) public posts;    

    struct Image {
        string hash;
        string description;
    }

    struct Post {
        uint id;
        Image image;
        string review;
        address payable author;
    }

    event PostCreated (
        uint id,
        Image image,
        string review,
        address payable author
    );

    // create post
    function uploadPost(string memory _imgHash, string memory _imageDescription, string memory _review) public {
        // make sure the image hash exists
        require(bytes(_imgHash).length > 0);   
        // make sure the image description exists
        require(bytes(_imageDescription).length > 0);  
        // make sure the review exists
        require(bytes(_review).length > 0);   
        // make sure the uploader address exists
        require(msg.sender != address(0)); 

        posts[++postCount] = Post(postCount, Image(_imgHash, _imageDescription), _review, payable(msg.sender));
        emit PostCreated(postCount, Image(_imgHash, _imageDescription), _review, payable(msg.sender));
    }
}
