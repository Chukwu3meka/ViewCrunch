import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { navigationStyles } from ".";

const NavigationContainer = ({ crunches = ["hacks", "science", "movies", "social", "growth", "internet", "computers"] }) => {
  return (
    <Grid item xs={12} sm={12} md={4}>
      <div className={navigationStyles.navigation}>
        <div>
          <Typography component="h2">DISCOVER WHAT MATTERS TO YOU</Typography>
          <div>
            {crunches.map((x) => (
              <Button variant="outlined" size="small" key={x}>
                {x}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Typography component="h2">DISCOVER WHAT MATTERS TO YOU</Typography>
          <div>
            {crunches.map((x) => (
              <Button variant="outlined" key={x}>
                {x}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default NavigationContainer;
