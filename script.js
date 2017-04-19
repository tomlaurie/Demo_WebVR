// JavaScript Document


(function () { 
		   window.onload = function(e)
		   {
			   /*setting up variables - three colours of boxes and how they relate to each other in rows and columns*/
			   
			   var gameActive=false;
			   var canReplay=false;
			   
			   var clickArr=new Array();
			   clickArr[0]=document.getElementById('sq1c');
			   clickArr[1]=document.getElementById('sq2c');
			   clickArr[2]=document.getElementById('sq3c');
			   clickArr[3]=document.getElementById('sq4c');
			   clickArr[4]=document.getElementById('sq5c');
			   clickArr[5]=document.getElementById('sq6c');
			   clickArr[6]=document.getElementById('sq7c');
			   clickArr[7]=document.getElementById('sq8c');
			   clickArr[8]=document.getElementById('sq9c');
			   
			   var blueArr=new Array();
			   blueArr[0]=document.getElementById('sq1b');
			   blueArr[1]=document.getElementById('sq2b');
			   blueArr[2]=document.getElementById('sq3b');
			   blueArr[3]=document.getElementById('sq4b');
			   blueArr[4]=document.getElementById('sq5b');
			   blueArr[5]=document.getElementById('sq6b');
			   blueArr[6]=document.getElementById('sq7b');
			   blueArr[7]=document.getElementById('sq8b');
			   blueArr[8]=document.getElementById('sq9b');
			   
			   var pinkArr=new Array();
			   pinkArr[0]=document.getElementById('sq1p');
			   pinkArr[1]=document.getElementById('sq2p');
			   pinkArr[2]=document.getElementById('sq3p');
			   pinkArr[3]=document.getElementById('sq4p');
			   pinkArr[4]=document.getElementById('sq5p');
			   pinkArr[5]=document.getElementById('sq6p');
			   pinkArr[6]=document.getElementById('sq7p');
			   pinkArr[7]=document.getElementById('sq8p');
			   pinkArr[8]=document.getElementById('sq9p');
			   
			   var yellowArr=new Array();
			   yellowArr[0]=document.getElementById('sq1y');
			   yellowArr[1]=document.getElementById('sq2y');
			   yellowArr[2]=document.getElementById('sq3y');
			   yellowArr[3]=document.getElementById('sq4y');
			   yellowArr[4]=document.getElementById('sq5y');
			   yellowArr[5]=document.getElementById('sq6y');
			   yellowArr[6]=document.getElementById('sq7y');
			   yellowArr[7]=document.getElementById('sq8y');
			   yellowArr[8]=document.getElementById('sq9y');
			   
			   var textInstructions=document.getElementById('text_instructions');
			   var textCompleted=document.getElementById('text_completed');
			   var replay=document.getElementById('textClick');
			   
			   textCompleted.setAttribute("visible", false);
			   
			   var myscene=document.querySelector('a-scene');
			   
			   var squareConnections=new Array();
			   var colourVisible=new Array();
	
			   var i,j,k=0;
			   
				
				
				for(i=0;i<blueArr.length;i++)
				{
					squareConnections[i]=new Array();
					colourVisible[i]=1;
					
					
					yellowArr[i].setAttribute("visible", false);
					pinkArr[i].setAttribute("visible", false);
					blueArr[i].setAttribute("visible", false);
					
					createfunc(i);
				}
				
				
				
				squareConnections[0][0]=1;
				squareConnections[0][1]=2;
				squareConnections[0][2]=3;
				squareConnections[0][3]=4;
				squareConnections[0][4]=7;
				
				squareConnections[1][0]=1;
				squareConnections[1][1]=2;
				squareConnections[1][2]=3;
				squareConnections[1][3]=5;
				squareConnections[1][4]=8;
				
				squareConnections[2][0]=1;
				squareConnections[2][1]=2;
				squareConnections[2][2]=3;
				squareConnections[2][3]=6;
				squareConnections[2][4]=9;
				
				squareConnections[3][0]=4;
				squareConnections[3][1]=5;
				squareConnections[3][2]=6;
				squareConnections[3][3]=1;
				squareConnections[3][4]=7;
				
				squareConnections[4][0]=4;
				squareConnections[4][1]=5;
				squareConnections[4][2]=6;
				squareConnections[4][3]=2;
				squareConnections[4][4]=8;
				
				squareConnections[5][0]=4;
				squareConnections[5][1]=5;
				squareConnections[5][2]=6;
				squareConnections[5][3]=3;
				squareConnections[5][4]=9;
				
				squareConnections[6][0]=7;
				squareConnections[6][1]=8;
				squareConnections[6][2]=9;
				squareConnections[6][3]=1;
				squareConnections[6][4]=4;
				
				squareConnections[7][0]=7;
				squareConnections[7][1]=8;
				squareConnections[7][2]=9;
				squareConnections[7][3]=2;
				squareConnections[7][4]=5;
				
				squareConnections[8][0]=7;
				squareConnections[8][1]=8;
				squareConnections[8][2]=9;
				squareConnections[8][3]=3;
				squareConnections[8][4]=6;
				
				/*randomising the initial square patterns*/
				
				randomise();
				
				/*Set the visible boxes according to the array*/
				setupSquares();
				
				
				replay.addEventListener('click', function ()
				 {
					 if(canReplay==true && gameActive==false)
					 {
					 	randomise();
						setupSquares();
						gameActive=true;
						
						textInstructions.setAttribute("visible", false);
			   			textCompleted.setAttribute("visible", false);
					 }
				 });
				
				 /* Function crandomises aquare patterns
				 *
				 * @return            none
				 */
				function randomise()
				{
					var randSq=0;
					var i=0;
					
					for (i=0;i<100;i++)
					{
						randSq=Math.floor(Math.random()*8.999);
						for(j=0;j<squareConnections[randSq].length;j++)
						{
							if(colourVisible[squareConnections[randSq][j]-1]===0)
							{
								colourVisible[squareConnections[randSq][j]-1]=2;
							}
							else
							{
								colourVisible[squareConnections[randSq][j]-1]--;
							}
							
						}
						
						if(checkGameWin()===true)
						{
							i-=10;	
						}
					}
				}
				
				/**
				 * Function closure handles fuse click events on the squares
				 *
				 * @param iVal 	  	  the array index of the square
				 * @return            none
				 */
				function createfunc(iVal) {
					
					clickArr[iVal].addEventListener('click', function ()
					 {
						 sqClick(iVal);
					 });
				}
				
				/**
				 * This function processes square clicks, adjusts resulting square colours and checks for a win
				 *
				 * @param iVal 	  	  the array index of the square
				 * @return            none
				 */
				function sqClick(iVal) {
					var i=0;
					if(gameActive==true)
					{
					
						for(i=0;i<squareConnections[iVal].length;i++)
						{
							if(colourVisible[squareConnections[iVal][i]-1]===2)
							{
								colourVisible[squareConnections[iVal][i]-1]=0;
							}
							else
							{
								colourVisible[squareConnections[iVal][i]-1]++;
							}
						}
						setupSquares();
						
						if(checkGameWin()==true)
						{
							gameActive=false;
							
							textInstructions.setAttribute("visible", false);
			   				textCompleted.setAttribute("visible", true);
							
						}
						
					}
				}
				
				/**
				 * This function checks for a win
				 *
				 * @return            boolean (true if game is won)
				 */
				function checkGameWin()
				{
					var i=0;
					var gameWon=true;
					
					for(i=0;i<colourVisible.length;i++)
					{
						if(colourVisible[i]!==1)
						{
							gameWon=false;
						}
					}
					
					return gameWon;
				}
				
				/**
				 * This function processes square clicks, adjusts resulting square colours and checks for a win
				 *
				 * @param iVal 	  	  the array index of the square
				 * @return            none
				 */
				function setupSquares() {
					
					var i=0;
					for(i=0;i<colourVisible.length;i++)
					{
						if(colourVisible[i]===0)
						{
							blueArr[i].setAttribute("visible", true);
							pinkArr[i].setAttribute("visible", false);
							yellowArr[i].setAttribute("visible", false);
						}
						if(colourVisible[i]===1)
						{
							blueArr[i].setAttribute("visible", false);
							yellowArr[i].setAttribute("visible", false);
							pinkArr[i].setAttribute("visible", true);
						}
						if(colourVisible[i]===2)
						{
							blueArr[i].setAttribute("visible", false);
							pinkArr[i].setAttribute("visible", false);
							yellowArr[i].setAttribute("visible", true);
						}
					}
				}
				
				/**
				 * This function prevents an accidental click at the start of the game
				 *
				 * @return            none
				 */
				setTimeout(function(){ 
					gameActive=true;
					canReplay=true;
				}, 1100);
		   }
			
			
		   
}()); 