 class Reset
 {
     constructor()
     {
    // for making reset button.
     this.reset = createButton('Reset');
     this.reset.scale = 1.5;
     }

     display()
     {
        this.reset.position( 500, 20);
        this.reset.mousePressed(()=>{
            score = 0;
            gameState="Over"

       });
        
     }
 }