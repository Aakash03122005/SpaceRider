class Astroids
{
    constructor(x,y)
    {
        var options=
        {
            'resitution':0.1, 
            'friction':0.01,
        }
        
        this.astroids = Bodies.circle(x,y,5,options);
        this.r=5 // r means radius of the astroids drop
        World.add(world,this.astroids);
    }
    update()
    {
        if(this.astroids.position.y > height)
        {
          Matter.Body.setPosition(this.astroids,{x:random(0,600),y:random(0,600)});
        }
        // this means that if the position of the astroids is less than the height then the it randomly spawn.
        // for the random astroids effect.
    }
    DisplayAstroids()
    {
        fill("grey")
        ellipseMode(CENTER);
        ellipse(this.astroids.position.x,this.astroids.position.y,this.r,this.r)
    }
};