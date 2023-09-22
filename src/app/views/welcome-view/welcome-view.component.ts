import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  NgZone,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  OnDestroy,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { UserAppService } from 'src/app/services/userApp/user-app.service';
import { UserApp } from 'src/app/models/userApp.model';
import { Zone } from 'src/app/models/zone.model';
import { ZoneService } from 'src/app/services/zone/zone.service';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrls: ['./welcome-view.component.scss'],
})
export class WelcomeViewComponent
  implements OnInit, AfterViewChecked, AfterContentChecked, OnDestroy
{
  root!: am5.Root;
  root2!: am5.Root;

  users!: User[];
  userSub!: Subscription;

  usersApp!: UserApp[];
  userAppSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  admin!: number;
  director!: number;
  user!: number;

  occurencesArray!: any[];

  cpt = 0;
  cpt2 = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private userService: UserService,
    private userAppService: UserAppService,
    private zoneService: ZoneService
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
    this._initSubs();
    this.userService.getAll();
    this.userAppService.getAll();
    this.zoneService.getAll();
  }

  _initSubs() {
    this.userSub = this.userService.items.subscribe(
      (items) => (this.users = items)
    );
    this.userAppSub = this.userAppService.items.subscribe(
      (items) => (this.usersApp = items)
    );
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
  }

  ngAfterContentChecked(): void {
    if (this.users) {
      this.admin = this.users.filter((x) => {
        return x.role == 'admin';
      }).length;
      this.director = this.users.filter((x) => {
        return x.role == 'director';
      }).length;
      this.user = this.users.filter((x) => {
        return x.role == 'user';
      }).length;
    }

    if (this.usersApp && this.zones) {
      const occurences = this.usersApp.reduce((a, user) => {
        const zoneId = user.zoneId;
        const role = user.role;
        let acc = a as any;
        if (!acc[zoneId]) {
          acc[zoneId] = {};
        }

        if (!acc[zoneId][role]) {
          acc[zoneId][role] = 1;
        } else {
          acc[zoneId][role]++;
        }

        return acc;
      }, {});

      const roles = Array.from(new Set(this.usersApp.map((user) => user.role)));
      const occurencesArray = [];

      for (const zoneId in occurences) {
        const roleCounts = roles.reduce((a, role) => {
          let acc = a as any;
          acc[role] = (occurences as any)[zoneId][role] || 0;
          return acc;
        }, {});

        occurencesArray.push({
          category: this.getZoneById(zoneId),
          director: (roleCounts as any)['director'],
          employe: (roleCounts as any)['user'],
        });
      }

      // console.log(occurencesArray);
      this.occurencesArray = occurencesArray;
    }
  }

  getZoneById(id: string) {
    return this.zones
      .map((s) => {
        if (s.id === id) {
          return s.name;
        }
        return null;
      })
      .filter((s) => s != null)
      .toString();
  }

  ngAfterViewChecked(): void {
    if (this.usersApp && this.zones) {
      if (this.cpt == 0) {
        this.browserOnly(() => {
          if (this.root) {
            this.root.dispose();
          }
        });

        this.browserOnly(() => {
          let root = am5.Root.new('chartdiv');
          root.setThemes([am5themes_Animated.new(root)]);
          let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
              panY: false,
              layout: root.verticalLayout,
            })
          );
          // Define data
          let data = this.occurencesArray;

          // Create Y-axis
          let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
              min: 0,
              max: 100,
              calculateTotals: true,
              numberFormat: "#'%'",
              renderer: am5xy.AxisRendererY.new(root, {}),
            })
          );
          // Create X-Axis
          let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
              maxDeviation: 0.1,
              renderer: am5xy.AxisRendererX.new(root, {}),
              categoryField: 'category',
            })
          );
          xAxis.data.setAll(data);
          // Create series
          function createSeries(name: string, field: string) {
            var series = chart.series.push(
              am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                valueYShow: 'valueYTotalPercent',
                categoryXField: 'category',
                stacked: true,
              })
            );
            series.data.setAll(data);
            series.columns.template.setAll({
              tooltipText: '{name}, {categoryX} : {valueY}',
              width: am5.percent(90),
              tooltipY: 10,
            });
            series.data.setAll(data);
            series.appear();
            series.bullets.push(function () {
              return am5.Bullet.new(root, {
                locationY: 0,
                sprite: am5.Label.new(root, {
                  // text: "{valueY}",
                  fill: root.interfaceColors.get('alternativeText'),
                  centerY: 0,
                  centerX: am5.p50,
                  populateText: true,
                }),
              });
            });
          }
          createSeries('Directeur', 'director');
          createSeries('Employé', 'employe');
          // Add legend
          let legend = chart.children.push(
            am5.Legend.new(root, {
              centerX: am5.p50,
              x: am5.p50,
            })
          );
          legend.data.setAll(chart.series.values);
          this.root = root;
        });
        this.cpt++;
      }
    }

    if (this.users) {
      if (this.cpt2 == 0) {
        this.browserOnly(() => {
          if (this.root2) {
            this.root2.dispose();
          }
        });

        this.browserOnly(() => {
          var root = am5.Root.new('chartdiv-users');

          root.setThemes([am5themes_Animated.new(root)]);

          var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
              endAngle: 270,
            })
          );

          // Define data
          var data = [
            {
              category: 'Admin',
              value: this.admin,
            },
            {
              category: 'Directeur',
              value: this.director,
            },
            {
              category: 'User',
              value: this.user,
            },
          ];

          // Create series
          var series = chart.series.push(
            am5percent.PieSeries.new(root, {
              valueField: 'value',
              categoryField: 'category',
              endAngle: 270,
            })
          );
          series.states.create('hidden', {
            endAngle: -90,
          });
          series.data.setAll(data);
          series.appear(1000, 100);

          this.root2 = root;
        });
      }
      this.cpt2++;
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
    this.browserOnly(() => {
      if (this.root2) {
        this.root2.dispose();
      }
    });
  }
}
